<?php 
class IndexController extends CController{
    /**
     * 设置layout的文件
     * 
     * @var type 
     */
    public $layout = 'application.views.layouts.base';
  
    public function init(){
        if(!Yii::app()->session['userID'] && (Yii::app()->request->isAjaxRequest || Yii::app()->request->isPostRequest)){ 
            echo CJSON::encode(array('status' => -1, 'info'=> "亲，要登录"));
            die;
        }
        if(!Yii::app()->session['userID']){
            $cookie = Yii::app()->request->getCookies();
            unset($cookie['nickname']);
            $this->redirect(Yii::app()->createUrl('blogs/pub/index'));
        }
    }


    /**
     * [actionHight 创建或编辑博客]
     * @return [type] [description]
     */
    public function actionHight() {
        $blogs = new Blogs();
        $data = array('id'=>'','title'=>"",'article'=>"");
        if(Yii::app()->getRequest()->getParam('articleID')){
            $articleObj = $blogs->findByAttributes (array('id'=>Yii::app()->getRequest()->getParam('articleID'))); 
            if($articleObj){
                $data = $articleObj->attributes;
            }
        }
        $this->render("hight",array('data' => $data));
    }

    /**
     * [actionAdd 添加创建文章或修改更新文章]
     * @return [type] [description]
     */
    public function actionAdd() {
        if(Yii::app()->request->isAjaxRequest){ 
            $blogs = new Blogs();
            $blogs->id = Yii::app()->getRequest()->getParam('blogId');

            $blogs->title = Yii::app()->getRequest()->getParam('title');
            $blogs->article = Yii::app()->getRequest()->getParam('article');

            $blogs->validate();
            // if ($blogs->getErrors()) {
            //     echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            //     die;
            // }else{
                if($blogs->id){
                    // 修改
                    $count = $blogs->updateAll(array('title'=> $blogs->title, 'article' => $blogs->article), "id=:id", array(":id"=>$blogs->id));
                    if($count > 0){
                        echo CJSON::encode(array('status' => 1, 'href' => Yii::app()->createUrl('blogs/pub/show',array('articleID'=>$blogs-> id))));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -3, 'info'=> "亲，保存失败"));
                        die;
                    }
                }else{
                    // 创建
                    $blogs->id = date("YmdHis").floor(microtime()*1000).rand(1000,9999); 
                    $blogs->author = Yii::app()->request->cookies['nickname'];
                    $blogs->date = date("Y-m-d H:i:s"); 
                    $blogs->userID = Yii::app()->session['userID']; 

                    if($blogs->save ()>0){ 
                        echo CJSON::encode(array('status' => 1, 'href' => Yii::app()->createUrl('blogs/pub/show', array('articleID' => $blogs-> id) )));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -1, 'info'=> "保存失败"));
                        die;
                    }
                }
            // }
        }
    }


    


    // 添加评论
    public function actionAddeval() {
        if(Yii::app()->request->isPostRequest){
            $eval = new BlogEval();
            $eval->evalid = date("YmdHis").floor(microtime()*1000).rand(1000,9999);
            $eval->content = Yii::app()->getRequest()->getParam('content');
            $eval->blogid = Yii::app()->getRequest()->getParam('blogID');
            $eval->nickname = Yii::app()->request->cookies['nickname'];
            $eval->date = date("Y-m-d H:i:s");
            
            $eval->validate();
            if ($eval->getErrors()) {
                echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
                die;
            }else{
                if($eval->save ()>0){ 
                    echo CJSON::encode(array('status' => 1, 'info'=>"亲，说说成功"));
                    die;
                }else{
                    echo CJSON::encode(array('status' => -1, 'info'=> "亲，说说失败"));
                    die;
                }
            }
            
        }else{
            echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            die;
        }
    }

    // 说说 顶 踩
    public function actionGoodbad(){
        if(Yii::app()->request->isAjaxRequest){
            $blogs = new Blogs();
            $blogs->id = Yii::app()->getRequest()->getParam('blogid');
            $type = Yii::app()->getRequest()->getParam('type');
            $userID = Yii::app()->session['userID'];
            $ckey = $blogs->id . $userID;
            $cvalue=Yii::app()->cache->get($ckey);
            

            if($cvalue===false){
                $blogObj = $blogs->findByAttributes (array('id'=>$blogs->id)); 
                if($blogObj){
                    if(1==$type){
                        $blogs->good = $blogObj->good + 1;
                        $blogs->bad = $blogObj->bad;
                    }
                    if(-1==$type){
                        $blogs->good = $blogObj->good;
                        $blogs->bad = $blogObj->bad + 1;
                    }

                    $count = $blogs->updateAll(array('good'=> $blogs->good, 'bad' => $blogs->bad), "id=:id", array(":id"=>$blogs->id));
                    
                    if($count > 0){
                        Yii::app()->cache->set($ckey, '1', (mktime(0,0,0,date('m'),date('d')+1,date('Y'))-1 - time()));
                        echo CJSON::encode(array('status' => 1, 'info' => '成功'));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -2, 'info'=> "亲，稍后试试"));
                        die;
                    }
                }else{
                    echo CJSON::encode(array('status' => -2, 'info'=> "亲，稍后试试"));
                    die;
                }
            }else{
                echo CJSON::encode(array('status' => -3, 'info'=> "亲，一个说说一天一次吆"));
                die;
            }
        }
    }













    public function actionIndex(){
        $blogs = new Blogs();
                
        $articleObj = $blogs->findByAttributes (array('id'=>Yii::app()->getRequest()->getParam('articleID'))); 
        $title = '';
        $article = '';
        if($articleObj){
            $title = $articleObj['title'];
            $article = $articleObj['article'];
        }
        
        
        
        $data = array('title'=>$title,'article'=>$article);
//        var_dump( $articleObj,array('data' => $data));
        
//        $this->render('index',array('data' => $data,'aaaaa'=>'aaaaaaaaaaaaaaa'));
        
         // echo 'test';
        $this->render('index');
    }
    
    
    public function actionSend(){
        //        $mailer = Yii::createComponent('application.extensions.PHPMailer');
        include("protected/extensions/PHPMailer/class.phpmailer.php");
        include("protected/extensions/PHPMailer/class.smtp.php");

        $message = 'Hello World!';
        $mailer = new PHPMailer();
        $mailer->Host = 'smtp.163.com';
        $mailer->IsSMTP();
        $mailer->SMTPAuth = true;
        $mailer->From = 'godgiftgame@163.com';
        $mailer->AddReplyTo('godgiftgame@163.com');
        //发送到邮箱
        $mailer->AddAddress('godgiftgame@163.com');
        $mailer->FromName = 'send name';//发送邮箱的名字
        $mailer->Username = 'godgiftgame@163.com';    //这里输入发件地址的用户名
        $mailer->Password = '**********';    //这里输入发件地址的密码
        $mailer->SMTPDebug = false;   //设置SMTPDebug为true，就可以打开Debug功能，根据提示去修改配置
        $mailer->CharSet = 'UTF-8';
        $mailer->Subject = Yii::t('demo', 'Yii rulez!');
        $mailer->Body = $message;
        if(!$mailer->Send()) {
         echo "Mailer Error: " . $mailer->ErrorInfo;
        } else {
         echo "Message sent!";
        }   
    }
    
    
    
    
    
    
    
    
    
    public function actionListblogs(){
        $blog = new Blogs();
        $criteria = new CDbCriteria();
        $criteria->order = 'date DESC';
        $count = $blog->count();
        $page = new CPagination($count);
        $page->pageSize = 10;
        $page->applyLimit($criteria);
        $locationInfos = Blogs::model()->findAll($criteria);
        
//        $blogs = new Blogs();
//        $blogs->order = "date DESC";
        $edata =  array();
        
        
        
        
//        $criteria = new CDbCriteria();
//        $criteria->condition = "user_id=$userId and status>0";
//        $criteria->order = "id desc";
//        $count = $locationInfoModel->count('user_id=:user_id and status>0', array(':user_id' => $userId));
//        $page = new CPagination($count);
//        $page->pageSize = 10;
//        $page->applyLimit($criteria);
//        $locationInfos = $locationInfoModel->findAll($criteria);

        
//        foreach ($articleList as $key => $value) {
//                $edata[] = $value->attributes;
//            }
        
//        echo '<pre>';
//        print_r($articleList);
//        echo '<pre>';
     
        $this->render("list",array('locationInfos' => $locationInfos, 'pages' => $page));
    }
} 
<?php

class PubController  extends CController{
    public $layout = 'application.views.layouts.base';

    public $pageNum ;

    public function init(){
    // 每页个数
        $this->pageNum = 10;
    }
    // 首页
    public function actionIndex() {
        $blogs = new Blogs();
        $xingxing = array();
        $newnew = array();
        $commentData = array();

        // 本周说说之星
        $blogsObj=Blogs::model()->findAll(array(
                'limit'=>5,
                // 'offset'=>$total,
                'order'=>'good desc',
                'condition'=>"date between :startTime and :endTime",
                'params'=>array(":startTime"=> date('Y-m-d 0:0:0',mktime(0,0,0,date('m'),date('d')-date('w')+1,date('Y'))) , "endTime" => date('Y-m-d 23:59:59',mktime(23,59,59,date('m'),date('d')-date('w')+7,date('Y'))))
        )); 

        foreach ($blogsObj as $key => $value) {
                $xingxing[] = $value->attributes;
        }

        
        // 本周评论说说之最
        $sql = 'select a.id,a.title,a.date,a.article,count(*) as type from blogs as a , blogseval as b where  a.id = b.blogid and a.date between "' . date('Y-m-d 0:0:0',mktime(0,0,0,date('m'),date('d')-date('w')+1,date('Y'))) . '"  and "'. date('Y-m-d 23:59:59',mktime(23,59,59,date('m'),date('d')-date('w')+7,date('Y'))) .'"  group by b.blogid order by count(*) desc';
        $commentObj = Blogs::model()->findAllBySql($sql); 
        foreach ($commentObj as $key => $value) {
                $commentData[] = $value->attributes;
        }

        // 最新说说
        $newblogsObj=Blogs::model()->findAll(array(
            'limit'=>10,
            'order'=>'date desc'
        )); 

        foreach ($newblogsObj as $key => $value) {
            $newnew[] = $value->attributes;
        }

        

        // 本期游戏排名
        $quota = new Quota();
        $qdata = array();
       
        $datas=Quota::model()->findAll(array(
            'limit'=>10,
            'order'=>'score desc'
        )); 

        foreach ($datas as $key => $value) {
            $qdata[] = $value->attributes;
        }
        $this->render("index", array('starList' => $xingxing, 'commentList' => $commentData, 'newList' => $newnew , 'sortList' => $qdata ));
    }

    // 博文列表页
    public function actionListblogs(){
        $blog = new Blogs();
        $criteria = new CDbCriteria();
        $isEdit = false;
        if(Yii::app()->session['userID'] && Yii::app()->getRequest()->getParam('nickname')){
            $criteria->addCondition("userID = :userID"); 
            $criteria->params[':userID']=Yii::app()->session['userID'];  
            $isEdit = true;
        }
        $criteria->order = 'date DESC';
        $count = $blog->count($criteria);
        $page = new CPagination($count);
        $page->pageSize = 10;
        $page->applyLimit($criteria);
        $locationInfos = Blogs::model()->findAll($criteria);

        $edata =  array();

        $this->render("list",array('locationInfos' => $locationInfos, 'pages' => $page , 'isEdit' => $isEdit));
    }


    // 游戏
    public function actionGame(){
        $this->render("game");
    }

    // 关于
    public function actionAbout(){
        $this->render("about");
    }


    // 具体博文展示
    public function actionShow() {
        $blogs = new Blogs();
        $eval = new BlogEval();
        $data = array();
        $edata = array();
        $blogID = Yii::app()->getRequest()->getParam('articleID');
        if($blogID){
            $articleObj = $blogs->findByAttributes (array('id'=>$blogID)); 
            if($articleObj){
                $data = $articleObj->attributes;
            }
            
            $total = BlogEval::model()->count('blogid=:blogID',array(':blogID'=>$blogID)) ;
            $isTotal = ($total>$this->pageNum) ? true : false;

            $evalObj=BlogEval::model()->findAll(array(
                'limit'=>$this->pageNum,
                // 'offset'=>$total,
                'order'=>'date desc',
                'condition'=>"blogid=:blogid",
                'params'=>array(":blogid"=>$blogID)
            )); 

            foreach ($evalObj as $key => $value) {
                $edata[] = $value->attributes;
            }
           
        }
        $this->render("show",array('data' => $data, 'lists' => $edata , 'isTotal' => $isTotal ));
    }



    // 加载更多评论
    public function actionEvalmore(){
        if(Yii::app()->request->isAjaxRequest){
            $eval = new BlogEval();
            $edata = array();
            $blogID = Yii::app()->getRequest()->getParam('blogId');
            $number = Yii::app()->getRequest()->getParam('number');

            if($blogID){
                $articleObj = $eval->findByAttributes (array('blogid'=>$blogID)); 
                if($articleObj){
                    $data = $articleObj->attributes;
                }

                $total = BlogEval::model()->count('blogid=:blogID',array(':blogID'=>$blogID)) ;
                $isTotal = ($total>$this->pageNum) ? true : false;

                $evalObj=BlogEval::model()->findAll(array(
                    'limit'=>$this->pageNum,
                    'offset'=> ($number - 1) * $this->pageNum,
                    'order'=>'date desc',
                    'condition'=>"blogid=:blogid",
                    'params'=>array(":blogid"=>$blogID)
                )); 

                foreach ($evalObj as $key => $value) {
                    $edata[] = $value->attributes;
                }
                
                echo CJSON::encode(array('status' => 1, 'info'=> $edata ));
                die;
            }else{
                echo CJSON::encode(array('status' => -1, 'info'=> "亲，加载失败"));
                die;
            }
        }else{
            echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            die;
        }
    }

    // 登录页面
    public function actionLogin() {
        $this->render("login");
    }


    // 退出页面
    public function actionLogout() {
        unset(Yii::app()->session['userID']);  
        $cookie = Yii::app()->request->getCookies();
        unset($cookie['nickname']);
        $this->render("logout");
    }
    
    // 注册页面
    public function actionRegister() {
        $this->render("register");
    }
    
    
    // 注册结果页
    public function actionRegisteresult(){
        $this->render("registerResult"); 
    }
    
    // 注册成功页
    public function actionRegistersuccess() {
        $code = Yii::app()->getRequest()->getParam('code');
        if($code){
            $users = new Users();
            $users->updateAll(array('status'=>'1'),'register=:register',array(':register'=>$code));            
            
            $userObj = $users->findByAttributes (array('register'=>$code)); 

            if($userObj){
                Yii::app()->session['userID']= $userObj["userID"];
                $cookie = new CHttpCookie('nickname',$userObj["nickname"]);
                Yii::app()->request->cookies['nickname']= $cookie;
            }else{
                $this->redirect(Yii::app()->createUrl('blogs/pub/index'));
            }
        }
        $this->render("registerSuccess");
    }


    public function actionError(){
        echo "错误";
    }

}
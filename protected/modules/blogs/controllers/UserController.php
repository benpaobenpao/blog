<?php

class UserController  extends CController{
     
    public $layout =  'application.views.layouts.base';

    public function init(){
        // if(!Yii::app()->session['userID'] && (Yii::app()->request->isAjaxRequest || Yii::app()->request->isPostRequest)){ 
        //     echo CJSON::encode(array('status' => -1, 'info'=> "亲，要登录"));
        //     die;
        // }
        // if(!Yii::app()->session['userID']){
        //     $cookie = Yii::app()->request->getCookies();
        //     unset($cookie['nickname']);
        //     $this->redirect(Yii::app()->createUrl('blogs/pub/index'));
        // }
    }
    
    
    // 登录请求
    public function actionReadylogin() {
        if(!Yii::app()->request->isPostRequest){
            echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            die;
        }else{

            $users = new Users();
            $email = Yii::app()->getRequest()->getParam('email');
            $password = Yii::app()->getRequest()->getParam('pwd');

            $users->email = $email;
            $users->password = $password;
            $users->validate();

            if ($users->getErrors()) {
                echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
                die;
            }

            if($users->findByAttributes (array('email'=>$email))){
                $userObj = $users->findByAttributes (array('email'=>$email, "password"=>md5($password)));
                if($userObj){
                    if(1==$userObj->status){
                       Yii::app()->session['userID']= $userObj["userID"];
                        $cookie = new CHttpCookie('nickname',$userObj["nickname"]);
                        Yii::app()->request->cookies['nickname']= $cookie;
                        echo CJSON::encode(array('status' => 1, 'href'=> Yii::app()->createUrl("blogs/user/welcome") ));
                        die; 
                    }else if(2==$userObj->status){
                        echo CJSON::encode(array('status' => -1, 'info'=>"亲，邮箱中激活后登录"));
                        die;
                    }else if(-1==$userObj->status){
                        echo CJSON::encode(array('status' => -1, 'info'=>"亲，服务忙，稍后再试"));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -1, 'info'=>"亲，用户名或密码错误"));
                        die;
                    }
                }else{
                    echo CJSON::encode(array('status' => -1, 'info'=>"亲，用户名或密码错误"));
                    die;
                }
            }else{
                echo CJSON::encode(array('status' => -1, 'info'=>"亲，先注册后登录"));
                die;
            }
        }
    }
    
   
    
    
    
    // 注册请求
    public function actionReadyregister() {
        if(!Yii::app()->request->isPostRequest){
            echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            die;
        } else{
            $users = new Users();
            $users->userID = date("YmdHis").floor(microtime()*1000).rand(1000,9999);
            $users->email = Yii::app()->getRequest()->getParam('email');
            $users->nickname = Yii::app()->getRequest()->getParam('username');
            $users->password = md5(Yii::app()->getRequest()->getParam('pwd'));
            $users->register = md5($users->userID);  //CommonTools::randCode(20, 5);
            $users->datetime = date("Y-m-d H:i:s");
            $users->status = 2;

            $users->validate();

            if ($users->getErrors()) {
                echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
                die;
            }

            // 检查用户状态 1已经注册  2将要注册 -1 黑户，并未验证邮箱
            $userObj = $users->findByAttributes (array('email'=>$users->email));

            if($userObj){
                if(1==$userObj->status){
                    echo CJSON::encode(array('status' => -1, 'info'=> "邮箱已经注册了"));
                    die;
                }else if(2==$userObj->status){
                    $count = Users::model()->updateAll(array('nickname' => $users->nickname, 'password'=>$users->password, 'datetime'=>$users->datetime),'userID=:userID',array(':userID'=>$userObj->userID)); 
                    if($count>0){
                        $content = $this->renderPartial("email", array('code'=>md5($userObj->userID)), TRUE);
                        if(CommonTools::sendEmail("欢迎注册上帝的礼物",$content ,$users->email)){
                            $cookie = new CHttpCookie('email',$users->email);
                            Yii::app()->request->cookies['email'] = $cookie;
                            echo CJSON::encode(array('status' => 1, 'href'=> Yii::app()->createUrl('blogs/pub/registeresult')));
                            die;
                        }else{
                            echo CJSON::encode(array('status' => -3, 'info'=> "注册失败"));
                            die;
                        }
                    } else{

                    }

                    echo CJSON::encode(array('status' => -2, 'info'=> "去邮箱验证"));
                    die;
                }else{
                    echo CJSON::encode(array('status' => -3, 'info'=> "其他原因"));
                    die;
                }
            }else{
                // 将用户注册信息添加到数据库中
                if($users->save()>0){  
                    $content = $this->renderPartial("email", array('code'=>$users->register), TRUE);
                    if(CommonTools::sendEmail("欢迎注册上帝的礼物",$content ,$users->email)){
                        $cookie = new CHttpCookie('email',$users->email);
                        Yii::app()->request->cookies['email'] = $cookie;
                        echo CJSON::encode(array('status' => 1, 'href'=> Yii::app()->createUrl('blogs/pub/registeresult')));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -3, 'info'=> "注册失败"));
                        die;
                    }
                }else{
                    echo CJSON::encode(array('status' => -3, 'info'=> "注册失败"));
                    die;
                }
            }
        }
    }



    public function actionWelcome() {
        $this->render("welcome");
    }
    
    

    // 修改密码页
    public function actionShowpwd(){
        $this->render("showPwd"); 
    }

    // 修改密码请求
    public function actionChangepwd(){
        if(Yii::app()->request->isPostRequest && Yii::app()->session['userID']){
            $oldpwd = Yii::app()->getRequest()->getParam('oldpwd');
            $newpwd = Yii::app()->getRequest()->getParam('newpwd');
            $renewpwd = Yii::app()->getRequest()->getParam('renewpwd');

            $users = new Users();
            $users->password = $oldpwd;

            $users->validate();

            if ($users->getErrors()) {
                echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
                die;
            }

            if($oldpwd!=$newpwd && $newpwd==$renewpwd){
                $users = new Users();
                $articleObj = $users->findByAttributes (array('password'=>$oldpwd));
                if($articleObj){
                    $count = $users->updateAll(array('password'=>$newpwd), "userID=:userID", array(":userID"=>Yii::app()->session['userID']));
                    if($count > 0){
                        echo CJSON::encode(array('status' => 1, 'info'=> "亲，密码修改成功"));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -3, 'info'=> "亲，密码修改失败，稍后再试"));
                        die;
                    }
                }else{
                    echo CJSON::encode(array('status' => -2, 'info'=> "亲，服务忙，稍后再试"));
                    die;
                }
            }

        }else{
            echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            die;
        }
    }
    
    // public function actionTest(){
    //     $user = new Users;
    //     //$user->email = "";
    //     $user->save();
   
    // }
}


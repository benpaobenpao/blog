<?php 
class IndexController extends CController{
    /**
     * 设置layout的文件
     * 
     * @var type 
     */
    public $layout = 'application.views.layouts.domgame';
  
    public function actionIndex() {

        $quota = new Quota();
        $qdata = array();
       
        $datas=Quota::model()->findAll(array(
            'limit'=>10,
            'order'=>'score desc'
        )); 

        foreach ($datas as $key => $value) {
            $qdata[] = $value->attributes;
        }
                  
        $this->render("index", array('list' => $qdata ));
    }



    public function actionAddcolor(){ 
        if(Yii::app()->request->isAjaxRequest){ 
            $quota = new Quota();
            $quota->quotaID =  date("YmdHis").floor(microtime()*1000).rand(1000,9999);
            $quota->gameID = 1;
            $quota->userID = Yii::app()->session['userID'];
            $quota->userName = Yii::app()->request->cookies['nickname'];
            $quota->score = Yii::app()->getRequest()->getParam('score');
            $quota->createTime = date("Y-m-d H:i:s");

            if($quota->userID){
            //     $evalObj=BlogEval::model()->findAll(array(
            //     'limit'=>$this->pageNum,
            //     // 'offset'=>$total,
            //     'order'=>'date desc',
            //     'condition'=>"blogid=:blogid",
            //     'params'=>array(":blogid"=>$blogID)
            // )); 

                $curUser = Quota::model()->findAll("userID=:userID and gameID=:gameID", array(":userID"=>$quota->userID,":gameID"=> $quota->gameID));

                if($curUser ){
                    if($curUser[0]->score < $quota->score){
                        $countRt = $quota->updateAll(array('score'=>$quota->score ),"userID=:userID and gameID=:gameID", array(":userID"=>$quota->userID,":gameID"=> $quota->gameID));  
                        if($countRt>0){
                            echo CJSON::encode(array('status' => 1, 'info'=>"亲，分数提交成功"));
                            die;
                        }else{
                            echo CJSON::encode(array('status' => -1, 'info'=> "亲，分数提交失败"));
                            die;
                        } 
                    }else{
                        echo CJSON::encode(array('status' => 1, 'info'=>""));
                        die;
                    }
                }else{
                    if($quota->save ()>0){ 
                        echo CJSON::encode(array('status' => 1, 'info'=>"亲，分数提交成功"));
                        die;
                    }else{
                        echo CJSON::encode(array('status' => -1, 'info'=> "亲，分数提交失败"));
                        die;
                    }
                }
            } else{
                echo CJSON::encode(array('status' => 1, 'info'=>""));
                die;
            }
        }else{
            echo CJSON::encode(array('status' => -4, 'info'=> "亲，暴力哦"));
            die;
        }
    }


} 
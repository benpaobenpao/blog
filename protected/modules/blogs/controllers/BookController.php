<?php

class BookController  extends CController{
     
    public $layout = 'application.views.layouts.base';
    
    public function actionCode() {
        include('phpqrcode.php');
        // 二维码数据
        $data = 'http://s.bookphone.cn';
        // 生成的文件名
        $filename = '1111.png';
        // 纠错级别：L、M、Q、H
        $errorCorrectionLevel = 'L';
        // 点的大小：1到10
        $matrixPointSize = 4;
        QRcode::png($data, $filename, $errorCorrectionLevel, $matrixPointSize, 2);
        $this->render("code");
    }


    public function actionEdit(){
        $books = new Books();

                $data = array(
                    "barcode"=>"",
                    "title" => "",
                    "author" => "",
                    "ISBN" => "",
                    "contributor" => "",
                    "introduction" => ""
                );
        if(Yii::app()->getRequest()->getParam('bookID')){
            $articleObj = $books->findByAttributes (array('barcode'=>Yii::app()->getRequest()->getParam('bookID'))); 
            if($articleObj){
//                $barcode = $articleObj['barcode'];
//                $title = $articleObj['title'];
//                $author = $articleObj['author'];
//                $ISBN = $articleObj['ISBN'];
//                $contributor = $articleObj['contributor'];
//                $introduction = $articleObj['introduction'];
                
                $data = $articleObj->attributes;
            }
        }
//        $data = array('barcode'=>$barcode, 'title'=>$title,'author'=>$author,'ISBN'=>$ISBN,'contributor'=>$contributor,'introduction'=>$introduction);
        $this->render("edit",array('data' => $data));
    }
    
    
    
    public function actionSavedit(){
//        if(Yii::app()->request->isAjaxRequest){ 
            try{
                $books = new Books();
                $books->barcode = Yii::app()->getRequest()->getParam('barcode');
                $books->title = Yii::app()->getRequest()->getParam('title');
                $books->author = Yii::app()->getRequest()->getParam('author');
                $books->ISBN = Yii::app()->getRequest()->getParam('ISBN');
                $books->contributor = Yii::app()->getRequest()->getParam('contributor');
                $books->introduction = Yii::app()->getRequest()->getParam('introduction');
                $books->datetime = date("Y-m-d H:i:s");

                if(empty($books->title)){
                    echo CJSON::encode(array('status' => -2 , 'info'=> "书的名称不能为空"));
                    die;
                }

                if($books->save ()>0){ 
                    echo CJSON::encode(array('status' => 1, 'info'=>"保存成功"));
                    die;
                }else{
                    echo CJSON::encode(array('status' => -1, 'info'=> "保存失败"));
                    die;
                }
            } 
            catch (Exception $e) {
                echo CJSON::encode(array('status' => -3, 'info'=> "条形码不能重复"));
                die;
            }
//        }
    }
    
    
    
    public function actionShow() {
        $books = new Books();
        $evals = new BookEval();
        $edata = array();
        if(Yii::app()->getRequest()->getParam('bookID')){
            $articleObj = $books->findByAttributes (array('barcode'=>Yii::app()->getRequest()->getParam('bookID'))); 
            if($articleObj){
                $data = $articleObj->attributes;
            }
//            $evalObj = $evals->findByAttributes (array("bookname"=> $data["title"]));
//            $evals->condition='bookname=:bookname';  
//            $evals->params=array(':bookname'=>$data["title"]); 
//            $evalObj=BookEval::model()->find($evals);
            
            $evalObj=BookEval::model()->findAll("bookname=:bookname",array(":bookname"=>$data["title"]));  
            
            foreach ($evalObj as $key => $value) {
                $edata[] = $value->attributes;
            }
//            var_dump($evalObj);die;
//            if($evalObj){
//                
//            }
//            echo $data["title"];
//            var_dump($edata);die;
            $this->render("show",array('data' => $data,'edata'=> $edata));
        }else{
            $this->render("show");
        }
    }
    
    
    public function actionAddeval() {
        try{
                $evals = new BookEval();
                $evals->evalID = date("YmdHis").  rand(10000, 99999);
                $evals->content = Yii::app()->getRequest()->getParam('contributor');
                $evals->bookname = Yii::app()->getRequest()->getParam('bookname');
                $evals->datetime = date("Y-m-d H:i:s");
                
                if(empty($evals->content)){
                    echo CJSON::encode(array('status' => -2 , 'info'=> "不能为空"));
                    die;
                }

                if($evals->save ()>0){ 
                    echo CJSON::encode(array('status' => 1, 'info'=>"保存成功"));
                    die;
                }else{
                    echo CJSON::encode(array('status' => -1, 'info'=> "保存失败"));
                    die;
                }
            } 
            catch (Exception $e) {
                echo CJSON::encode(array('status' => -3, 'info'=> "保存失败"));
                die;
            }
    }
}


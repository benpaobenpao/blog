<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 class TestController  extends CController{
     
    public $layout = 'application.views.layouts.base';
    public function actionTest(){
//        echo 'test';
        $this->render('addBook');
    }
 }


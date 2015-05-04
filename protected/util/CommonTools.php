<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CommonTools
 *
 * @author Administrator
 */
class CommonTools {
    //put your code here
    
    //生成随机验证码
    public static function randCode($length = 5, $type = 0) {
        $arr = array(1 => "0123456789", 2 => "abcdefghijklmnopqrstuvwxyz", 3 => "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4 => "~@#$%^&*(){}[]|", 5=>"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~@#$%^&*(){}[]|");
        if ($type == 0) {
            array_pop($arr);
            $string = implode("", $arr);
        } elseif ($type == "-1") {
            $string = implode("", $arr);
        } else {
            $string = $arr[$type];
        }
        $count = strlen($string) - 1;
        $code = '';
        for ($i = 0; $i < $length; $i++) {
            $code .= $string[rand(0, $count)];
        }
        return $code;
    }
    
    public static function sendEmail($title,$message,$useremail){
        include("protected/extensions/PHPMailer/class.phpmailer.php");
        include("protected/extensions/PHPMailer/class.smtp.php");

//        $message = '<a target="_blank" href="">确认链接</a>';
        $mailer = new PHPMailer();
        $mailer->Host = 'smtp.163.com';
        $mailer->IsSMTP();
        $mailer->SMTPAuth = true;
        $mailer->IsHTML(true); 
        $mailer->From = 'godgiftgame@163.com';
//        $mailer->AddReplyTo('godgiftgame@163.com'); //发送到邮箱
        $mailer->AddAddress($useremail);
        $mailer->FromName = 'godgiftgame';//发送邮箱的名字
        $mailer->Username = 'godgiftgame@163.com';    //这里输入发件地址的用户名
        $mailer->Password = 'godtian123aa';    //这里输入发件地址的密码
        $mailer->SMTPDebug = false;   //设置SMTPDebug为true，就可以打开Debug功能，根据提示去修改配置
        $mailer->CharSet = 'UTF-8';
        $mailer->Subject = Yii::t('email', $title);
        $mailer->Body = $message;
        if(!!$mailer->Send()) {
            return true;
//         echo "Mailer Error: " . $mailer->ErrorInfo;
        } 
        return false;
    }


    public static function utf8_strcut($str, $start, $length=null) {   
        preg_match_all('/./us', $str, $match);   
        $chars = is_null($length)? array_slice($match[0], $start ) : array_slice($match[0], $start, $length);   
     
        unset($str);
     
        return implode('', $chars);   
    } 
}

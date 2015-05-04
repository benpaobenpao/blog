<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>欢迎注册上帝的礼物（godgiftgame）官网</title>
    </head>
    <body>
        
        <p><a target="_blank" href="<?php echo Yii::app()->params["host"].Yii::app()->createUrl('/blogs/pub/registersuccess', array('code'=>$code)) ?>"><?php echo Yii::app()->params["host"].Yii::app()->createUrl('/blogs/user/registersuccess&code='.$code) ?></a></p>
        备注：若非本人操作可以忽略此邮件或删除邮件。
    </body>
</html>

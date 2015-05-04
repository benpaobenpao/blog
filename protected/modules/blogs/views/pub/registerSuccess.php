<?php $this->pageTitle="注册完成需要去邮箱验证——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/register.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/js/registerSuccess.min.js',CClientScript::POS_END);  ?>
<div class="container register registerSuccess">
    <p class="message">恭喜注册成功。</p>
    <p class="time"><span></span>后自动跳转到用户中心</p>
    <a href="<?php echo Yii::app()->createUrl('/blogs/user/welcome'); ?>" class="btnGreen">用户中心</a>
</div>


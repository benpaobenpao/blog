<?php $this->pageTitle="注册完成需要去邮箱验证——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/register.min.css');  ?>
<div class="container register registerResult">
    <p class="message">亲，注册完成，邮箱验证之后注册成功。</p>
    <a class="btnGreen" href="<?php echo  'http://mail' . preg_replace('/^(\w*?@)/','.', Yii::app()->request->cookies['email'] ) ?>">邮箱验证</a>
</div>


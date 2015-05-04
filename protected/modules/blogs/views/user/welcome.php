<?php $this->pageTitle='欢迎 ' .  Yii::app()->request->cookies['nickname']  . ' —— 上帝的礼物'; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/welcome.min.css');  ?>

<div class="container welcome">
    <div class="gcol3"><a class="hvr-curl-top-right" href="<?php echo Yii::app()->createUrl('/blogs/index/hight'); ?>"><div title="Code: 0xe8f1" class="the-icons"><i class="icon-book"></i><span class="i-name">写说说</span></div></a></div>
    <div class="gcol3"><a class="hvr-curl-top-right" href="<?php echo Yii::app()->createUrl('/blogs/pub/listblogs', array('nickname' => Yii::app()->request->cookies['nickname'])); ?>"><div title="Code: 0xe809" class="the-icons"><i class="icon-user"></i><span class="i-name">我的说说</span></div></a></div>
    <div class="gcol3"><a class="hvr-curl-top-right" href="<?php echo Yii::app()->createUrl('/blogs/user/showpwd'); ?>"><div title="Code: 0xe842" class="the-icons"><i class="icon-lock"></i><span class="i-name">修改密码</span></div></a></div>
</div>
<div class="container">

</div> 


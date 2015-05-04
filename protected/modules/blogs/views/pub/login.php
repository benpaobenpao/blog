<?php $this->pageTitle="登录——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/login.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/Validform_v5.3.2.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/js/login.min.js',CClientScript::POS_END);  ?>

<div class="container login clearfix">
    <div class="gcol4">&nbsp;</div>
    <div class="gcol7">
        <form id="loginform" action="<?php echo Yii::app()->createUrl('/blogs/user/readylogin'); ?>" >
            <div class="btnGroups"><input type="text" value="" name="email" placeholder="邮箱" datatype="e" nullmsg="亲，没有输入邮箱"  errormsg="亲，检查输入邮箱格式" /></div>
            <div class="btnGroups"><input type="password" value="" name="pwd" placeholder="密码" datatype="s6-20" nullmsg="亲，没有输入密码" errormsg="亲，密码范围在6~20位字符" /></div>
            <div class="btnGroups"><input class="btnGreen" type="submit" value="登录"><a href="<?php echo Yii::app()->createUrl('/blogs/pub/register'); ?>" class="btnGreen" >注册</a></div>
        </form>
    </div>
    <div class="gcol4">&nbsp;</div>
</div>
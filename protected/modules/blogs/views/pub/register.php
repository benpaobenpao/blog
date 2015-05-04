<?php $this->pageTitle="注册——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/register.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/Validform_v5.3.2.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/js/register.min.js',CClientScript::POS_END);  ?>
<div class="container register">
    <div class="gcol2">&nbsp;</div>
    <div class="gcol11">
        <form id="registerform" action="<?php echo Yii::app()->createUrl('/blogs/user/readyregister');?>" >
            <div class="btnGroups"><input name="email" type="text" datatype="e" nullmsg="亲，没有输入邮箱"  errormsg="亲，检查输入邮箱格式" placeholder="邮箱(经常用的邮箱)" ></div>
            <div class="btnGroups"><input name="username" type="text" datatype="/^[a-zA-Z0-9_\u4E00-\u9FA5]{1,10}$/" nullmsg="亲，没有输入昵称"  errormsg="亲，检查输入昵称(昵称由1到10的汉字字母数字组成)" placeholder="昵称(由汉字、大小字母、数字及下划线组成，长度1到10个字符)"></div>
            <div class="btnGroups"><input name="pwd" type="password" datatype="/^[a-zA-Z0-9_]{6,20}$/" nullmsg="亲，没有输入密码"  errormsg="亲，检查输入密码(由6到20位的大小写数字或下划线组成)" placeholder="密码(由大小字母、数字及下划线组成，长度6到20位的字符)"></div>
            <div class="btnGroups"><input name="repwd" type="password" datatype="/^[a-zA-Z0-9_]{6,20}$/" recheck="pwd" nullmsg="亲，没有输入确认密码"  errormsg="亲，检查输入确认密码与密码不一致" placeholder="确认密码(再次输入一次确认密码)"></div>
            <div class="btnGroups"><input class="btnGreen" type="submit" value="注册"><a href="<?php echo Yii::app()->createUrl('/blogs/pub/login'); ?>" class="btnGreen" >登录</a></div>
        </form>
    </div>
    <div class="gcol2">&nbsp;</div>
</div>
<?php $this->pageTitle="修改密码——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/register.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/Validform_v5.3.2.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/js/changepwd.min.js',CClientScript::POS_END);  ?>

<div class="container register">
    <div class="gcol2">&nbsp;</div>
    <div class="gcol11">
        <form id="changeform" action="<?php echo Yii::app()->createUrl('/blogs/user/changepwd');?>" >
            <div class="btnGroups"><input name="oldpwd" type="password" datatype="s6-20" nullmsg="亲，没有输入旧密码"  errormsg="亲，检查旧密码输入位数" placeholder="旧密码"></div>
            <div class="btnGroups"><input name="newpwd" type="password" datatype="s6-20" nullmsg="亲，没有输入新密码"  errormsg="亲，检查新密码(由6到20位大小写字母数字下划线组成)" placeholder="新密码(由大小写字母或数字组成，长度在6到20位)"></div>
            <div class="btnGroups"><input name="renewpwd" type="password"  datatype="s6-20" recheck="newpwd" nullmsg="亲，没有输入确认密码密码"  errormsg="亲，检查确认密码与密码不一致" placeholder="确认信密码(与新密码相同)"></div>
            <div class="btnGroups"><input class="btnGreen" type="submit" value="保存"></div>
        </form>
    </div>
    <div class="gcol2">&nbsp;</div>
</div>
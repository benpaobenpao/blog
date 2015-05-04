<?php $this->pageTitle="写博文——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/kindeditor/themes/default/default.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/kindeditor/kindeditor-min.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/kindeditor/lang/zh_CN.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/Validform_v5.3.2.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/js/blog/edit.min.js',CClientScript::POS_END);  ?>

<div class="container">
    <form id="editForm" action="<?php echo Yii::app()->createUrl('blogs/index/add'); ?>">
        <input name="blogId" type="hidden" value="<?php echo $data['id'];?>">
        <div class="btnGroups"><input id="title" name="title" type="text" value="<?php echo $data['title'];?>" datatype="*1-80" nullmsg="亲，没有输入标题"  errormsg="亲，输入标题过长" placeholder="标题"></div>
        <div class="btnGroups"><textarea id="article" name="article" style="width: 100%; height:600px; visibility:hidden;"><?php echo $data['article'];?><br></textarea></div>
        <div class="btnGroups"><input id="btnSave" class="btnGreen" type="submit"  value="保存"></div>
    </form>
</div>
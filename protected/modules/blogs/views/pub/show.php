<?php $this->pageTitle=$data['title']."——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/highlight/styles/solarized_dark.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/highlight/highlight.pack.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/kindeditor/themes/default/default.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/kindeditor/kindeditor-min.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/kindeditor/lang/zh_CN.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/Validform_v5.3.2.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/dot.min.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/evalShow.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/js/blog/show.min.js',CClientScript::POS_END);  ?> 

<input id="curBlogID" type="hidden" value="<?php echo $data['id']; ?>">
<div class="container evalShow">
    <div class="evalArticle">
        <div class="title"><?php echo $data['title'];?></div>
        <div class="info clearfix">
            作者：<?php echo $data['author'];?>
            <div class="time">时间：<?php echo $data['date'];?></div>
        </div>
        <div class="message"><?php echo $data['article'];?></div>
        <div class="praise gright">
            <label id="goodEval" title="Code: 0xe853" class="the-icons"><i class="icon-thumbs-up"></i><span class="i-name">(<?php echo $data['good'];?>)</span></label>
            <label id="badEval" title="Code: 0xe852" class="the-icons"><i class="icon-thumbs-down"></i><span class="i-name">(<?php echo $data['bad'];?>)</span></label>
        </div> 
    </div>
</div>

<div class="container evalShow">
    <div class="parTit"><div title="Code: 0xe82e" class="the-icons"><i class="icon-comment"></i> <span class="i-name">说一说</span></div></div>
    <div class="evalReply">
        <form id="showEval" action="<?php echo Yii::app()->createUrl('/blogs/index/addeval');?>" >
            <div class="btnGroups"><textarea id="evaluation" name="content"></textarea></div>
            <div class="btnGroups"><input name="blogID" type="hidden" value="<?php echo $data['id']; ?>"></div>
            <div class="btnGroups gright"><input class="btnGreen" type="submit" value="说说" ></div>
        </form>
    </div>
</div>

<div class="container evalShow">
    <div class="parTit"><div title="Code: 0xe82d" class="the-icons"><i class="icon-chat"></i> <span class="i-name">大家的说说</span></div></div>
    <?php if(count($lists)>0){ ?>
        <div class="evalList">
        <?php foreach ($lists as $key => $value) { ?>
            <div class="item">
                <div class="info clearfix">回复人：<?php echo $value['nickname']; ?> <div class="time">时间：<?php echo $value['date']; ?></div></div>
                <div class="message"><?php echo $value['content']; ?></div>
            </div>
        <?php } ?>
        <?php if($isTotal) { ?>
            <div class="evalMore"><a id="evalMore" href="javascript:void(0);" blogid="<?php echo $data['id']; ?>" number="2" >加载更多</a></div>
        <?php } ?>
        </div>
    <?php } else { ?>
        <div class="evalNone">
            无人说说，好冷清，整个世界都安静了。。。
        </div>
    <?php } ?>
</div>

<script id="moreBlock" type="text/x-dot-template">
    {{~it.info:value:index}}
        <div class="item">
            <div class="info clearfix">回复人：{{= value.nickname }} <div class="time">时间：{{= value.date }}</div></div>
            <div class="message">{{= value.content }}</div>
        </div>
    {{~}}
</script>

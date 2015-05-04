<?php $this->pageTitle="说说——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/highlight/styles/solarized_dark.css');  ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/blogslist.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/highlight/highlight.pack.js',CClientScript::POS_END);  ?>

<div class="container blogsList">
<?php  foreach($locationInfos as $k=>$v){ ?>
    <div class="item">
        <div class="title clearfix">
            <?php if($isEdit){ ?>
                <a title="Code: 0xe85a" class="the-icons edit" href="<?php echo Yii::app()->createUrl('/blogs/index/hight', array('articleID' => $v->id));?>">
                    <i class="icon-edit"></i> <span class="i-name">[编辑]</span>
                </a>
            <?php }?>
            
            <a class="hvr-skew-backward" href="<?php echo Yii::app()->createUrl('/blogs/pub/show', array('articleID' => $v->id));?>" target="_blank">
                <?php if($isEdit){ ?><label title="Code: 0xe850" class="the-icons"><i class="icon-doc-text"></i></label><?php } ?>
                <?php  echo $v->title; ?>
            </a>

            <div class="goodbad">
                <label title="Code: 0xe853" class="the-icons"><i class="icon-thumbs-up"></i><span class="i-name">(<?php  echo $v->good; ?>)</span></label>
                <label title="Code: 0xe852" class="the-icons"><i class="icon-thumbs-down"></i><span class="i-name">(<?php  echo $v->bad; ?>)</span></label>
            </div>
        </div>
        <div class="article"><?php echo CommonTools::utf8_strcut(strip_tags($v->article) , 0 , 200) . ((strlen(strip_tags($v['article']))>200)?'...':''); ?> </div>
        <div class="tip clearfix"><div class="author">作者：<?php  echo $v->author; ?></div> <div class="date">时间：<?php echo $v->date; ?></div> </div>
    </div>
<?php } ?>
</div>

<div class="gpage container">
<?php
    $this->widget('CLinkPager', array(
        'header' => '',
        'firstPageLabel' => '<<',
        'lastPageLabel' => '>>',
        'prevPageLabel' => '<',
        'nextPageLabel' => '>',
        'pages' => $pages,
        'maxButtonCount' => 5,
    ));
?>
</div>
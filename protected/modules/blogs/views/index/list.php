<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/highlight/styles/solarized_dark.css');  ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/blogslist.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/highlight/highlight.pack.js',CClientScript::POS_END);  ?>

<div class="container blogsList">
<?php  foreach($locationInfos as $k=>$v){ ?>
    <div class="item">
        <div class="title"><a href="<?php echo Yii::app()->createUrl('/blogs/index/show&articleID='.$v->id);?>" target="_blank"><?php  echo $v->title; ?></a></div>
        <div class="article"><?php echo substr(strip_tags($v->article) , 0 , 10); ?> </div>
        <div class="tip">作者：<?php  echo $v->author; ?> 时间：<?php echo $v->date; ?> </div>
    </div>
<?php } ?>
</div>

<div class="container">
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
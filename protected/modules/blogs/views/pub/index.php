<?php $this->pageTitle="首页——上帝的礼物"; ?>
<?php   Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/css/home.min.css');  ?>

<div class="home container">
    <div class="parTit"><label title="Code: 0xe805" class="the-icons"><i class="icon-flag"></i> <span class="i-name">柱子怎么了</span></label></div>
    <div class="parBlogs" style="border: none;margin-bottom: 30px;">
        坚持滑动，柱子会发生。。。<a href="http://www.godgiftgame.com/static/cocos/pillar/index.html" target="_blank">柱子怎么了</a>
    </div>
    <?php if(count($starList)){ ?>
        <div class="parTit">
            <label title="Code: 0xe805" class="the-icons"><i class="icon-star"></i> <span class="i-name">本周说说之星</span></label>
        </div>
        <div class="parBlogs">
            <?php  foreach($starList as $k=>$v){ ?>
                <div class="item clearfix">
                    <div>
                        <a class="hvr-grow-rotate" href="<?php echo Yii::app()->createUrl('/blogs/pub/show' ,  array('articleID' => $v['id'])); ?>" target="_blank">
                            <label title="Code: 0xe853" class="the-icons"><i class="icon-thumbs-up"></i><span class="i-name">(<?php echo $v['good']; ?>)</span></label>
                            <?php  echo $v['title']; ?>
                        </a>
                        <span class="time"><?php echo $v['date']; ?></span>
                    </div>
                    <div class="artilce"><?php echo CommonTools::utf8_strcut(strip_tags($v['article']) , 0 , 300) . ((strlen(strip_tags($v['article']))>300)?'...':''); ?></div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>

    <?php if(count($commentList)){ ?>
        <div class="parTit">
            <label title="Code: 0xe805" class="the-icons"><i class="icon-eye"></i> <span class="i-name">本周评论之最</span></label>
        </div>
        <div class="parBlogs">
            <?php  foreach($commentList as $k=>$v){ ?>
                <div class="item clearfix">
                    <div>
                        <a class="hvr-wobble-top" href="<?php echo Yii::app()->createUrl('/blogs/pub/show' , array('articleID' => $v['id'])); ?>" target="_blank">
                            <label title="Code: 0xe853" class="the-icons"><i class="icon-pencil"></i><span class="i-name">(<?php  echo $v['type'] ?>)</span></label>
                            <?php  echo $v['title']; ?>
                        </a>
                        <span class="time"><?php echo $v['date']; ?></span>
                    </div>
                    <div class="artilce"><?php echo CommonTools::utf8_strcut(strip_tags($v['article']) , 0 , 300) . ((strlen(strip_tags($v['article']))>300)?'...':''); ?></div>
                </div>
            <?php } ?>
        </div>
    <?php } ?>

    <div class="parTit">
        <label title="Code: 0xe82d" class="the-icons span3"><i class="icon-chat"></i> <span class="i-name">最新说说</span></label>
    </div> 
    <div class="parBlogs">
        <?php  foreach($newList as $k=>$v){ ?>
            <div class="item clearfix">
                <div>
                    <a class="hvr-wobble-to-top-right" href="<?php echo Yii::app()->createUrl('/blogs/pub/show' , array( 'articleID' => $v['id'])); ?>" target="_blank">
                        <label title="Code: 0xe853" class="the-icons"><i class="icon-link"></i><span class="i-name">&nbsp;</span></label>
                        <?php  echo $v['title']; ?>
                    </a>
                    <span class="time"><?php echo $v['date']; ?></span>
                </div>
                <div class="artilce"><?php echo CommonTools::utf8_strcut(strip_tags($v['article']) , 0 , 300) . ((strlen(strip_tags($v['article']))>300)?'...':''); ?></div>
            </div>
        <?php } ?>
    </div>
</div>
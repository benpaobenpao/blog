
<form action="<?php echo Yii::app()->createUrl('/blogs/index/add');?>" method="post">
    <input name="title" type="text" placeholder="文章标题">
    <textarea name="article" placeholder="您的大作"></textarea>
    <input type="submit">
    <?php echo $data['title'];?>
</form>
        

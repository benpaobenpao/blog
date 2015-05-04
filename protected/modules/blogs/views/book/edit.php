<form action="<?php echo Yii::app()->createUrl('/blogs/book/savedit');?>" method="post">
    
    
    <?php
    
    //var_dump($data);die;
    
    ?>
<div>
    <input name="barcode" type="text" placeholder="条形码" value="<?php echo $data["barcode"];?>">
</div>
<div>
    <input name="title" type="text" placeholder="图书的名称" value="<?php echo $data['title'];?>">
</div>
<div>
    <input name="author" type="text" placeholder="作者" value="<?php echo $data['author'];?>">
</div>
<div>
    <input name="ISBN" type="text" placeholder="ISBN" value="<?php echo $data['ISBN'];?>">
</div>
<div>
    <input name="contributor" type="text" placeholder="贡献者" value="<?php echo $data['contributor'];?>">
</div>
<div>
    <textarea name="introduction" placeholder="简介"><?php echo $data['introduction'];?></textarea>
</div>
<div>
    <input type="submit" value="保存">
</div>
</form>

<a href="<?php echo Yii::app()->createUrl('/blogs/book/savedit&titleName='.$data['title']);?>"><?php echo $data['title'];?></a>
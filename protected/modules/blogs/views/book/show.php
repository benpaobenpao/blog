<?php if($data){ ?>

<table>
    <tr>
        <th>书名：</th>
        <td>《<?php echo $data["title"]; ?>》</td>
        <th>作者：</th>
        <td><?php echo $data["author"]; ?></td>       
    </tr>
    <tr>
        <th>
            简介：
        </th>
    </tr>
    <tr>
        <td><?php echo $data["introduction"]; ?></td>
    </tr>
</table>
<div>
    <form action="<?php echo Yii::app()->createUrl('/blogs/book/addeval');?>" method="post">
        <textarea name="contributor" placeholder="聊聊人生"></textarea>
        <input type="hidden" name="bookname" value="<?php echo $data["title"]; ?>"></textarea>
        <input type="submit" value="确定">
    </form>
    
</div>
<div>
    
    <?php foreach ($edata as $key => $value) { ?>
    <div>
        <div>回复人：<?php echo $value['nickname']; ?> 时间：<?php echo $value['datetime']; ?></div>
        <?php echo $value['content']; ?>
    </div>
    <?php } ?>
</div>
<?php } else{ ?> 
    书名不存在
<?php } ?>
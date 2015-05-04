<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script>
            if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
                var version = parseFloat(RegExp.$1);
                if(version>2.3){
                    var phoneScale = parseInt(window.screen.width)/640;
                    document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
                }else{
                    document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
                }
            }else{
                document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
            }
        </script>
        <title><?php echo CHtml::encode($this->pageTitle); ?></title>
        <script>
            var GURL = '<?php echo Yii::app()->params["host"]."/blog/index.php"; ?>';
            var GSTATIC = '<?php echo Yii::app()->params["static"]; ?>';
            var GDATETIME = '<?php echo (new DateTime('NOW'))->format('Y-m-d H:i:s') ?>';
        </script>
        <script src="<?php echo Yii::app()->params["static"]; ?>/plugs/jquery-2.1.3.min.js"></script> 
        
    </head>
    <body>
        <?php echo $content; ?>
    </body>
</html>

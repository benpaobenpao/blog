<!DOCTYPE html>
<html lang="cn">
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="上帝的礼物，www.godgiftgame.com，godgiftgame.com，godgiftgame，说说，游戏，迷你游戏 " />
        <meta name="keywords" content="上帝的礼物，godgiftgame，www.godgiftgame.com，godgiftgame.com，说说，游戏，迷你游戏" />
        <link rel="shortcut icon" href="<?php echo Yii::app()->params["static"]; ?>/images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="<?php echo Yii::app()->params["static"]; ?>/images/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params["static"]; ?>/public/css/base.min.css">
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params["static"]; ?>/plugs/animate.min.css">
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params["static"]; ?>/plugs/hover.min.css">
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params["static"]; ?>/font/css/fontello.css">
        <title><?php echo CHtml::encode($this->pageTitle); ?></title>
        <script>
            var GURL = '<?php echo Yii::app()->params["host"]; ?>';
            var GSTATIC = '<?php echo Yii::app()->params["static"]; ?>';
            var GDATETIME = '<?php echo (new DateTime('NOW'))->format('Y-m-d H:i:s') ?>';
        </script>
        <script src="<?php echo Yii::app()->params["static"]; ?>/plugs/jquery-2.1.3.min.js"></script> 
        <script src="<?php echo Yii::app()->params["static"]; ?>/plugs/jquery.cookie.js"></script> 
        <script src="<?php echo Yii::app()->params["static"]; ?>/public/js/base.min.js"></script> 
    </head>
    <body>
        <div class="container gheader clearfix">
            <a class="glogo bounceInDown animated" href="http://www.godgiftgame.com">
                <div title="Code: 0xe874" class="the-icons"><i class="icon-gift"></i></div>
                <div class="go">上帝的礼物</div>
            </a>
            <div title="Code: 0xe85c" class="the-icons saying bounceInRight animated"><i class="icon-quote-left"></i><span class="i-name">山不在高，有仙则名；水不在深，有龙则灵</span><i class="icon-quote-right"></i></div>
            <div class="user">
                <?php if(Yii::app()->request->cookies['nickname']){ ?>
                    <?php echo Yii::app()->request->cookies['nickname'] ?>
                    <a href="<?php echo Yii::app()->createUrl('/blogs/pub/logout'); ?>">退出</a>
                <?php } else{ ?> 
                    <a href="<?php echo Yii::app()->createUrl('/blogs/pub/login');?>">登录</a><a href="<?php echo Yii::app()->createUrl('/blogs/pub/register');?>">注册</a>
                <?php } ?>
            </div>
        </div>
        <div class="container gnav">
            <?php if(Yii::app()->request->cookies['nickname']){ ?>
                <a class="the-icons hvr-pulse" href="<?php echo Yii::app()->createUrl('blogs/user/welcome') ?>"><i class="icon-heart"></i> <span class="i-name">用户中心</span></a>
            <?php } ?>
            <a class="the-icons hvr-pulse" href="<?php echo Yii::app()->createUrl('blogs/pub/index') ?>"><i class="icon-home"></i> <span class="i-name">主页</span></a>
            <a class="the-icons hvr-pulse" href="<?php echo Yii::app()->createUrl('blogs/pub/listblogs') ?>"><i class="icon-book"></i> <span class="i-name">精彩说说</span></a>
            <a class="the-icons hvr-pulse" target="_blank" href="<?php echo Yii::app()->createUrl('game/index/index') ?>"><i class="icon-gamepad"></i> <span class="i-name">迷你游戏</span></a>
            <a class="the-icons hvr-pulse" href="<?php echo Yii::app()->createUrl('blogs/pub/about') ?>"><i class="icon-info-circled"></i> <span class="i-name">关于</span></a>
        </div>
        <?php echo $content; ?>
        <div class="information container clearfix">
            <div class="gcol3">&nbsp;</div>
            <div class="gcol3"><div><a class="hvr-bubble-float-bottom" href="http://weibo.com/u/5376913707" target="_blank"><img width="140" height="140" src="<?php echo Yii::app()->params["static"].'/images/qrweibo.png'; ?>"></a></div><a  href="http://weibo.com/u/5376913707" target="_blank">新浪微博</a></div>
            <div class="gcol3"><div><a class="hvr-bubble-float-bottom" href="http://t.qq.com/godgiftgame" target="_blank"><img width="140" height="140" src="<?php echo Yii::app()->params["static"].'/images/qrqq.png'; ?> "></a></div><a href="http://t.qq.com/godgiftgame" target="_blank">腾讯微博</a></div>
            <div class="gcol3"><div><img  width="140" height="140" src="<?php echo Yii::app()->params["static"].'/images/qrcode.png'; ?> "></div>微信订阅号</div>
            <div class="gcol3">&nbsp;</div>
        </div>
        <div class="container gfooter">&copyright;2015 godgiftgame 上帝的礼物</div>
    </body>
</html>

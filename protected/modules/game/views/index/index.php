<?php $this->pageTitle="颜色猜猜猜——游戏——上帝的礼物"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/public/mix/colors/index.min.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/public/mix/colors/index.min.js',CClientScript::POS_END);  ?>


<div class="level startLevel" style="display:block;">
    <div class="ranking">
        <?php if($list) { ?>
        <div class="title">全宇宙最佳成绩排名</div>
        <div class="sort">
            <table>
            <?php foreach ($list as $key => $value) { ?>
                <tr>
                    <td><?php echo $key+1; ?></td>
                    <td><?php echo $value['userName']; ?></td>
                    <td><?php echo $value['score']; ?></td>
                </tr>
            <?php } ?>
            </table>
        </div>
        <?php } ?>
    </div>
    
    <div class="message">
        游戏说明：在限定的时间内选择方块内的字体，登录后统计分数。
    </div>
    <input class="btn" id="startBtn" type="button" value="开始游戏">
</div>
<div class="level gameLevel" style="display:block;">
    <div class="time"><div class="line"></div></div>
    <div  class="bigFont">
        <div id="tagFont"></div>
        <div class="tscore">0</div>
        <div class="bscore">0</div>
    </div>
    <div class="question">上面字体的颜色，请选择？</div>
    <div id="fourBtns" class="groupBtns"></div>
</div>
<div class="level endLevel" >
    <div id="result" class="result"></div>
    <input id="reStartBtn" class="btn" type="button" value="再玩一次">
</div>
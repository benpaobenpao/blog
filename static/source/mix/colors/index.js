$(function() {
    var colors = [{
        name: "黑",
        val: "#000"
    }, {
        name: "红",
        val: "#f00"
    }, {
        name: "绿",
        val: "#0f0"
    }, {
        name: "蓝",
        val: "#00f"
    }, {
        name: "黄",
        val: "#ff0"
    }, {
        name: "粉",
        val: "#f0f"
    }, {
        name: "紫",
        val: "#939"
    }, {
        name: "橙",
        val: "#f90"
    }];

    var clen = colors.length;

    var fourBtns = $("#fourBtns");
    var tagFont = $("#tagFont");
    var result = $("#result");
    var curNum = null;
    var curScore = 0;


    $("#startBtn,#reStartBtn").on("click", function() {
        $(".level").hide();
        $(".gameLevel").show();
        
        createColor();
        acStatus = 1;
        totalTime = TIMENUM;
        curScore = 0;
        line.css({
                    width: "0%"
                });
        $(".tscore,.bscore").html(curScore);
        timeRun();
    });

    function createColor() {
        colors.sort(function() {
            return 0.5 - Math.random();
        });
        curNum = parseInt(Math.random() * 4);
        var curColor = colors[curNum];

        tagFont.html('<div style="color: ' + curColor.val + '">' + colors[parseInt(Math.random() * clen)].name + '</div>');

        var tmpHtml = "";

        for (var i = 0; i < 4; i++) {
            if (curNum === i) {
                tmpHtml += '<div style="color: 000;">' + colors[i].name + '</div>';
            } else {
                tmpHtml += '<div style="color: 000;">' + colors[clen - i - 1].name + '</div>';
            }
        }
        fourBtns.html(tmpHtml);
    }

    createColor();

    fourBtns.on("click", "div", function() {
        var $this = $(this);
        if (1 === acStatus) {
            if (curNum === $this.index()) {
                curScore++;
                $(".tscore,.bscore").html(curScore);
            }
            createColor();
            console.log(curScore);
        }

    });

    var TIMENUM = 60;
    var totalTime = TIMENUM;
    var line = $(".line");
    var clearTime = null;
    var acStatus = 0; // 0 未开始 1 开始 2 结束
    function timeRun() {
        if(1===acStatus){
            clearTime = setTimeout(function() {
                totalTime--;
                if (totalTime <= 0) {
                    clearTimeout(clearTime);
                    totalTime = 0;
                    acStatus = 2;
                    $(".level").hide();
                    $(".endLevel").show();
                    var url = GURL  + "?r=game/index/addcolor";
                    var params = {score: curScore};
                    $.post(url,params,function(){
                        var txt = "";

                        
                        if(curScore>5){
                            txt = "恭喜你，总成绩"+ curScore +"分";
                        }else{
                            txt = "略微有点小小遗憾，总成绩"+ curScore +"分";
                        }
                        
                        result.html(txt);
                    },"json");
                }
                line.css({
                    width: ((TIMENUM - totalTime) * 100 / TIMENUM) + "%"
                });
                timeRun();
            }, 1000);
        }
    }


});
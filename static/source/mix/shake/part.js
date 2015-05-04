$(function() {
    var listPeople = $(".listPeople");
    var listPeopleBlock = listPeople.find(".flipper");



    var len = listPeopleBlock.length;
    var count = 0;

    function run() {

        if (count >= len) {
            count = 0;
        }

        listPeopleBlock.removeClass("curFlipper").eq(count).addClass("curFlipper");

        var oldCount = count;
        var curObj = listPeopleBlock.eq(oldCount); // listPeopleBlock.find(".curFlipper");

        // console.log(curObj);
        var curObjBackSrc = curObj.find(".back img").attr("src");

        curObj.find(".front img").attr("src", curObjBackSrc);
        setTimeout(function() {
            curObj.find(".back img").attr("src", "../../mix/shake/images/c.jpg");
        }, 1000);



        // console.log(listPeopleBlock.find(" img").length);  

        // console.log(count);

        count++;

        setTimeout(function() {
            run();
        }, 1000);
    };

    setTimeout(function() {
        run();
    }, 1500);



    // 数据心跳  30s 一次    数据一组六十个   整组执行时间1min
    // 数据存储到本地，先读取本地数据，如果未过期
    // 签到状态   0  未开始    1 进行中   2结束
    // 整组数据执行完成，变更DOM元素

    // 默认值，存储到本地，数据变化时变更本地存储
    var dataScource = [];
    var curIndex = 0;
    var partStatus = 0;

    function runData() {
        // ajax  存储数据，保存到本地

        setTimeout(function() {

        }, 500);
    }



});
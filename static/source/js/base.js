var g = {};

g.promptBox = function(options) {
    var defaults = {
        type: null,
        msg: null
    };
    var opts = $.extend({}, defaults, options);

    if (!opts.type) {
        console.log("没有设置弹出类型");
        return;
    }

    if (!$.trim(opts.msg)) {
        console.log("没有设置弹出内容");
        return;
    }

    if ($(".promptBox").length) {
        $(".promptBox").remove(); 
    }

    var html = '';


    if ("error" === opts.type) {
        html = '<div class="promptBox error">' + opts.msg + '</div>';
    }

    if ("warn" === opts.type) {
        html = '<div class="promptBox warn">' + opts.msg + '</div>';
    }

    if ("ok" === opts.type) {
        html = '<div class="promptBox ok">' + opts.msg + '</div>';
    }

    $("body").append(html);

    clearTimeout(clearHtml);

    var clearHtml = setTimeout(function(){
        $(".promptBox").remove();
    },3000);
};


// 倒计时
g.countdown = function(options){
    var defaults = {
        dom : null,
        time: null,
        callback: null
    };
    var opts = $.extend({}, defaults, options);

    console.log(opts);

    if(!opts.dom){
        console.log("未指定元素");
        return;
    }

    if(!opts.time){
        console.log("未设置时间，单位s，例如：5");
        return;
    }

   
    $(opts.dom).html(opts.time+"s");
    function down(elem){
        
        var clrTime = setTimeout(function(){
            opts.time=opts.time - 1;
            elem.html(opts.time+"s");
            if(0>=opts.time){
                !!opts.callback && opts.callback();
                clearTimeout(clrTime); 
            }
            down(elem);
        },1000);
    }

    down($(opts.dom));
};
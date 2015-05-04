$(function() {
    var curBlogID = $("#curBlogID");

    $('.prettyprint').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    var editor;
    KindEditor.ready(function(K) {
        editor = K.create('#evaluation', {
            resizeType: 0,
            allowPreviewEmoticons: false,
            allowImageUpload: false,
            items: [
                'forecolor', 'hilitecolor', 'emoticons', 'link', 'code'
            ]
        });

        var articleFrame = $(kindEditorIframe.window.document.getElementsByTagName("body")[0]);
        var evaluation = $("#evaluation");

        $(articleFrame).on("keyup focus", function() {
            var articleHtml = articleFrame.html();
            evaluation.attr("value", articleHtml);
        });


        $.Tipmsg.r = null;
        $("#showEval").Validform({
            tiptype: function(msg) {
                g.promptBox({
                    "type": "error",
                    "msg": msg
                });
            },
            tipSweep: true,
            ajaxPost: true,
            beforeCheck: function(curform) {
                if($.cookie('nickname')){
                    var articleHtml = articleFrame.html();
                    evaluation.attr("value", articleHtml);
                }else{
                    g.promptBox({
                        "type": "warn",
                        "msg": "亲，登录后才能说说"
                    });
                    return false;
                }
            }, 
            beforeSubmit: function(curform) {
                var articleTxt = articleFrame.text();
                var articleHtml = articleFrame.html();
                if (!$.trim(articleTxt) && !/img/ig.test(articleHtml)) {
                    g.promptBox({
                        "type": "error",
                        "msg": "说说不能为空"
                    });
                    return false;
                }
            },
            callback: function(data) {
                if (1 === data.status) {
                    g.promptBox({
                        "type": "ok",
                        "msg": data.info
                    });
                    location.href = location.href;
                } else {
                    g.promptBox({
                        "type": "error",
                        "msg": data.info
                    }); 
                }
            }
        });
    });


    $("#evalMore").on("click", function(){
        var $this = $(this);
        var url = GURL + "?r=blogs/pub/evalmore";
        var curNum = $this.attr("number");
        var params = {'blogId': $this.attr("blogid") ,'number': curNum};
        $.post(url,params,function(data){
            if(1===data.status){
                var more = $(".evalMore");
                var addSideText = doT.template($("#moreBlock").html());
                more.before(addSideText({"info" : data.info}));
                if(data.info.length<3){
                    more.remove();
                }else{
                    $this.attr('number', (parseInt(curNum) + 1)); 
                }
            }else{
                g.promptBox({  
                    "type": "error",
                    "msg": data.info
                }); 
            }
        },"json");
    });


    function goodBad($this,mtype){
        if(!$.cookie('nickname')){
            g.promptBox({
                "type": "warn",
                "msg": "亲，登录后操作"
            });
        }else{
            var url = GURL + "?r=blogs/index/goodbad";
            var params = {blogid: curBlogID.val() , type: mtype};

            $.post(url,params,function(data){
                if(1===data.status){
                    var elem = $this.find(".i-name");
                    var m = parseInt(elem.text().replace(/[(|)]/ig,''));
                    elem.html('('+(m + 1)+')');
                }else{
                    g.promptBox({  
                        "type": "error",
                        "msg": data.info 
                    }); 
                } 
            },"json");
        }
    }

    $("#goodEval").on("click", function(){
        var $this = $(this);
        goodBad($this,1);
    });

    $("#badEval").on("click", function(){
        var $this = $(this);
        goodBad($this,-1);
    });

});
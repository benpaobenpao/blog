$(function() {
    var editor;
    KindEditor.ready(function(K) {
        editor = K.create('#article', {
            resizeType: 0,
            allowPreviewEmoticons: false,
            allowImageUpload: false,
            items: [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', '|', 'emoticons', 'image', 'link', 'code'
            ]
        });


        var articleFrame = $(kindEditorIframe.window.document.getElementsByTagName("body")[0]);
        var article = $("#article");
        var isAjax = false;

        $(articleFrame).on("keyup focus", function() {
            var articleHtml = articleFrame.html();
            article.attr("value", articleHtml);
        });

        $.Tipmsg.r = null;
        $("#editForm").Validform({
            tiptype: function(msg) {
                g.promptBox({
                    "type": "error",
                    "msg": msg
                });
            },
            tipSweep: true,
            ajaxPost: true,
            beforeCheck: function(curform) {
                isAjax = true;
                var articleHtml = articleFrame.html();
                article.attr("value", articleHtml);
            },
            beforeSubmit: function(curform) {
                var articleTxt = articleFrame.text();
                if (!$.trim(articleTxt) ) {
                    g.promptBox({
                        "type": "error",
                        "msg": "文章内容不能为空"
                    });
                    return false;
                }
            },
            callback: function(data) {
                if (1 === data.status) {
                    location.href = data.href;
                } else {
                    g.promptBox({
                        "type": "error",
                        "msg": data.info
                    });
                    isAjax = false;
                }
            }
        });
    
        // window.onbeforeunload = null;

        $(window).on("beforeunload", function(){
            if(($.trim(article.val())!="" || articleHtml != "")  && !isAjax){
                return "您输入的内容尚未保存，确定离开此页面吗？";
            }
        });

    });
});
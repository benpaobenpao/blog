$(function() {
    $.Tipmsg.r = null;
    $("#registerform").Validform({
        tiptype: function(msg) {
            g.promptBox({
                "type": "error",
                "msg": msg
            });
        },
        tipSweep: true,
        ajaxPost: true,
        callback: function(data){
            console.log(data);
            if(1===data.status){
                location.href = data.href;
            }else{
                g.promptBox({
                    "type": "error",
                    "msg": data.info
                });
            }
        }
    });
});
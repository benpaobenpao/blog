$(function(){
    g.countdown({'dom': ".registerSuccess .time span", time: 5, callback: function(){
        location.href= GURL + '?r=blogs/user/welcome';
    }});
});
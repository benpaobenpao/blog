/*
* scripts for miwifi WAP version
* Latest modified 2014-10-21 17:00
*/
$(document).ready(function(){
	//index
	var r1dArea = $(".wapScreenR1d");
	var miniArea = $(".wapScreenMini");
	var wifiArea = $(".wapScreenWifi");
	var sect4Foot = $(".sectionForFoot");
	var wrapper = $("#wrapper");
	var Height = 680;
	var wfWidth = wifiArea.width();
	var wfHeight = ( 1482 * wfWidth ) / 1080; //首页随身wifi背景图根据实际设备自动适配
	r1dArea.css("height", Height);
	miniArea.css("height", Height);
	sect4Foot.css("height", Height);
	wifiArea.css({
		"height": Height + "px",
		"background-size": wfWidth + "px " + wfHeight + "px"
	});

	//fullPage Slide for index
	$("#gotoMini").click(function(){
		wrapper.css("-webkit-transform", "translate3d(0px, " + (-Height) + "px, 0px)");
	});
	$("#gotoWifi").click(function(){
		wrapper.css("-webkit-transform", "translate3d(0px, " + (-(2*Height)) + "px, 0px)");
	});
	$("#gotoFoot").click(function(){
		wrapper.css("-webkit-transform", "translate3d(0px, " + (-(3*Height)) + "px, 0px)");
	});
	function Moving( el, upHeight, downHeight, isLast ){ //el是手指在其中滑动的元素，height是滑动高度
		var startY, moveEndY;
		el.on("touchstart", function(e){
			startY = e.originalEvent.changedTouches[0].pageY;
		});
		el.on("touchmove", function(e){
			moveEndY = e.originalEvent.changedTouches[0].pageY;
			var Y = ( moveEndY - startY );
			if( Y > 0 ){ //手指往下滑
				wrapper.css("-webkit-transform", "translate3d(0px, " + upHeight + "px, 0px)");
			}else{ //手指往上滑
			  if( isLast ){ //滑到最后一屏，不允许继续往上滑
					return false;
				}else{
					wrapper.css("-webkit-transform", "translate3d(0px, " + downHeight + "px, 0px)");
				}
		  }
		});
	};
	Moving( r1dArea, 0, -Height, false );
	Moving( miniArea, 0, -(2*Height), false );
	Moving( wifiArea, -Height, -(3*Height), false );
	Moving( sect4Foot, -(2*Height), -(3*Height), true );
	//index video show
	var videoURL = "http://player.youku.com/embed/XNjQ4NzMwMzky";
	$("#wapVideo").click(function(){
		$(".Pop").show().find(".rls").attr("src", videoURL);
		var frmWidth = $(".rls").width();
		var frmHeight = ( 484 * frmWidth ) / 860; //视频尺寸是860*484，这里自动适配尺寸比例
		$(".rls").css("height", frmHeight + "px");
	});

	//wap_download.html tab event
	function tabHideAll(){
		$(".wapTabLi a").removeClass("waptabActive");
		$(".wapTabLi p").removeClass("waptabPActive");
		$(".wapTabLi s").addClass("wapHide");
		$(".wapCons").removeClass("wapShow").addClass("wapHide");
	};
	$(".wapTabLi").click(function(){
		var me = $(this);
		var token = me.attr("data");
		tabHideAll();
		me.find("a").addClass("waptabActive"); //Tab对应的图标
		me.find("p").addClass("waptabPActive"); //Tab对应的标题文字
		me.find("s").removeClass("wapHide"); //Tab对应的小箭头
		$(".wapCon_" + token).removeClass("wapHide").addClass("wapShow");
	});
	//show logs in pop
	$(".seelog").click(function(){
		var me = $(this);
		var token = me.attr("data");
		var logTitle = $(".popTitle");
		var logCon = $(".logContent");
		$(".Pop").show();
		var datas = logDatas[token]; //根据token拿到对应的日志，包括标题和内容
		logTitle.html( datas[0] ); //展示对应标题
		logCon.html( datas[1] ); //展示对应日志
	});
	//close the pop
	$(".popClose").click(function(){
		$(".Pop").find(".rls").attr("src", "");
		$(".Pop").hide();
	});

});


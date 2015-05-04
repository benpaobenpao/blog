/*
* Scripts for miwifi_log.html
* The old datas are in miwifi_ori_log.js
* Latest modified on 2014-09-29 15:15
*/

//【查看更多】按钮结构：
	var cmoreTmpl = '<div class="log_item log_smore">\
	                   <div class="log_seemore"><a class="cmore" href="javascript:;">查看更多..</a></div>\
										 <div class="log_seeblank"></div>\
									 </div>';
	//html模板:
	var logTmpl = '<div class="log_item log_tmpl">\
	                 <div class="log_itemleft">\
									   <span class="log_item_tlt"></span>\
										 <a href="#" class="log_item_dl">立即下载</a>\
									 </div>\
									 <div class="log_item_time">\
									   <span class="log_item_time_date"></span>\
										 <span class="log_item_time_month"></span>\
									 </div>\
									 <div class="log_itemright">\
									   <s class="log_item_arr">对话气泡的小箭头</s>\
										 <div class="log_itemlog">\
										   <h1 class="log_itemh1"></h1>\
											 <div class="log_logbox"></div>\
											 <a href="javascript:;" class="log_openbox">点击查看全文...</a>\
										 </div>\
									 </div>\
								 </div>';

	//初始化部分配置:
	var setting = {
		unfoldableNum: 3, //不折叠的框的数目
		showDownload: 4, //前几个显示下载链接
		beforeSeeMore: 10, //排列在【查看更多】按钮前面的框的数目
		frontShow: 10, //最前面显示几个 (建议与beforeSeeMore数目一致)
		lastShow: 10, //最后面显示几个
		onceShow: 6, //点击一次【查看更多】时，显示几个条目
		logBoxHeight: 90, //过长的条目默认展示的高度，未展开时的高度
		totalDataLen: logData.length, //数据条数总数目
		typeColor: { //对页面显示日期的圆圈做不同颜色的渲染
			"blue": "#28d",
			"green": "#84d504",
			"orange": "#ff6c00"
		}
	};

	//填充数据：
	$.fn.fillData = function( data, before ){ //data是单条数据对象，before来标识是否在【查看更多】的前面
	  var tmpl = $( this );
	  tmpl.find(".log_item_tlt").html( data.logtype );
		if( data.link ){
		  tmpl.find(".log_item_dl").attr("href", data.link).addClass("log_item_dl_haslink").hide();
		}else{
		  tmpl.find(".log_item_dl").hide();
		}
		var d = new Date( data.time );
		var _date = d.getDate(),
		    _month = d.getMonth() + 1,
				_year = d.getFullYear();
		tmpl.find(".log_item_time_date").html( _date );
		tmpl.find(".log_item_time_month").html( _year + "/" + _month );
		tmpl.find(".log_itemh1").html( data.title );
		tmpl.find(".log_logbox").append( data.content );
		if( before ){
			tmpl.insertBefore(".log_smore");
		}else{
			tmpl.insertBefore(".log_footer");
		}
		var logBox = tmpl.find(".log_logbox");
		var logHeight = logBox.height();
		if( logHeight < setting.logBoxHeight ){ //实际高度小于指定展示高度时
			logBox.addClass("log_unfoldable"); //不折叠
			logBox.parent().css({"cursor": "auto"}); //不折叠则不需要点击，去掉鼠标的手形显示
			logBox.parent().find(".log_openbox").hide();
		}else{
			logBox.hide();
		}
		//对显示日期的圆圈填充颜色的处理：
		var dType = data.type;
		tmpl.find(".log_item_time").css({ "background": setting.typeColor[dType] });
		if( dType == "green" || dType == "orange" ){
			tmpl.find(".log_itemh1").css({"color": "#28d"});
		}
	};
  //为【查看更多】按钮设置监听事件
	$.fn.listenSeeMore = function(){
		var me = $(this);
	  me.bind("click", function(){
		  var nones = $(".log_none");
		  var nonLen = nones.length;
		  if( nonLen > setting.onceShow ){ //如果当前隐藏的条目数大于每次点击后显示的条目数
			  for(var x = 0; x < setting.onceShow; x++){
			  	$(nones[x]).removeClass("log_none").slideDown(200);
		  	}
			  $(".log_smore").remove();
			  $(cmoreTmpl).insertBefore($(".log_none")[0]).find(".cmore").listenSeeMore(); //展开后把按钮放在展开条目的后面
		  }else{ //隐藏的条目数小于等于每次点击后展示出的条目数
		    for(var x = 0; x < nonLen; x++){
		  		$(nones[x]).removeClass("log_none").slideDown(200);
	  		}
	  		me.parent().parent().hide();
	  	}
  	});
	}

	//渲染【查看更多】按钮：
	$(cmoreTmpl).insertAfter(".log_bar").find(".cmore").listenSeeMore();

	//渲染日志条目数据：
	for( var i = 0; i < setting.beforeSeeMore; i++ ){ //渲染【查看更多】之前的条目
		$(logTmpl).fillData( logData[i], true );
	};
	for( var j = setting.beforeSeeMore; j < setting.totalDataLen; j++ ){ //渲染【查看更多】之后的条目
		$(logTmpl).fillData( logData[j], false );
	};
	for( var k = 0; k < setting.unfoldableNum; k++ ){ //特殊处理不需折叠的条目
		$( $(".log_tmpl")[k] ).find(".log_logbox").show().addClass("log_unfoldable");
		$( $(".log_tmpl")[k] ).find(".log_openbox").hide().parent().css({"cursor": "auto"});
	};
	//点击单条的查看更多时，展开条目：
	$(".log_openbox").click(function(){
		var me = $(this);
		var box = $( (me.siblings())[1] );
		box.slideDown(200);
		me.hide(200);
	});
	//点击条目本身，也有展开效果:
	$(".log_itemlog").click(function(){
	  var me = $(this);
		var box = me.find(".log_logbox");
		var btn = me.find(".log_openbox");
		if( !box.hasClass("log_unfoldable") ){
			box.slideDown(200);
			btn.hide(200);
		}
	});

	//前setting.showDownload个条目需要显示下载链接：
	for( var y = 0; y < setting.showDownload; y++ ){
		var item = $( $(".log_item_dl_haslink")[y] );
		item.show();
		item.parent().find(".log_item_tlt").css({ "margin-top": "0px" });
	};

	for(var m = setting.frontShow; m < (setting.totalDataLen - setting.lastShow); m++){ //遍历中间被隐藏的条目
		$( $(".log_tmpl")[m] ).addClass("log_hidden").addClass("log_none");
	};

	//对最后一项条目做样式处理，去掉灰色竖线：
	var lastItem = $( $(".log_tmpl")[setting.totalDataLen - 1] ).find(".log_itemright");
	lastItem.css({
		"border-left": "none",
		"margin-bottom": "50px"
	});

	//成长日志页面里log_contents内容区为绝对定位，其内容高度没有影响body高度
	//在这个页面里点击【微信账号】弹出弹窗时，需要获取内容高度，然后赋值给body高度，才能保证弹窗蒙版正常显示：
	$("#wxNum").click(function(){
		var conLen = $(".log_contents").height();
		var bodyLen = conLen + 600;
		$("body").height( bodyLen );
	});



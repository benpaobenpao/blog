/*
* scripts for miwifi
* Latest modified 2014-09-25 15:47
*/
(function(){

	/* popSubNav用来弹出导航条中的子菜单 | 参数列表说明 */
	/* navli: 菜单容器，即包含主菜单项和子菜单项的li元素 */
	/* navs: 主菜单项a元素，鼠标滑过时背景高亮 */
	/* subs: 子菜单的div容器 */
	/* activeCls: 主菜单高亮时的样式名 */
	/* sub_firstCls: 子菜单项中第一项的特殊样式Class名 */
	/* sub_lastCls: 子菜单项中最后一项的特殊样式Class名 */
	/* sub_onlyoneCls: 子菜单项中只有一项时的特殊样式Class名 */
	function popSubNav( navli, navs, subs, activeCls, sub_firstCls, sub_lastCls, sub_onlyoneCls ){
		for(var i = 0; i < subs.length; i++){ // 为子菜单赋样式，不同个数，样式不同
			var _sub = subs[i];
		  var suba = $(_sub).children();
			if( suba.length > 1 ){
				$(suba[0]).addClass( sub_firstCls );
				$(suba[suba.length-1]).addClass( sub_lastCls );
			}else{
				$(suba[0]).addClass( sub_onlyoneCls );
			}
		} //end for
		navs.mouseenter(function(){
			var me = $(this);
			var seq = parseInt( me.attr("data") );
			var mySub = $(subs[seq]);
			var dad = $(navli[seq]);
			me.addClass( activeCls );
			me.click(function(){
				mySub.slideUp(200);
				me.removeClass( activeCls );
			});
			if(mySub.find('a').length > 0){
			  mySub.slideDown(200);
				mySub.find('a').click(function(){
					mySub.slideUp(200);
					me.removeClass( activeCls );
				});
			}
			dad.mouseleave(function(){
				me.removeClass( activeCls );
				mySub.slideUp(200);
			})
		})
	};

	popSubNav( $(".navli"),
	           $(".navs"),
						 $(".subs"),
						 "header_nav_active",
						 "sub_first",
						 "sub_last",
						 "sub_onlyone" 
						);


  /* ===== Roll用来轮播首页大图 | 参数列表说明 ===== */
  /* start: 起始位置，从0计数 */
	/* El: 滚动的元素，为图片列表的容器，移动的是El的left值 */
  /* dataArr: 盛放left值的数组容器，记录El每次滚动所达到的left位置 */
	/* duration: 每次滚动的间隔时间 */
	/* btnArr: 对应的按钮组 */
	/* btn_active: 按钮高亮时的Class名称 */
	/* outLink: 轮播图容器之外的要随之变化的元素 */
	/* outLinkStatus：数组，盛放outLink元素的状态变化 */
	var billboardLeft = ['0', '-100%', '-200%', '-300%', '-400%'];
	var fontColors = ['#28d', '#333', '#fff', '#fff', '#fff'];
	var setRedo;
	function Roll( start, 
				         El, 
								 dataArr, 
								 duration, 
								 btnArr, 
								 btn_active, 
								 outLink, 
								 outLinkStatus ){
			if( start == dataArr.length ){
				start = 0;	
			}
			El.animate({
				left: dataArr[start]
			}, 200, function(){
				$(btnArr).removeClass(btn_active);
				$(btnArr[start]).addClass(btn_active);
				outLink.css("color", outLinkStatus[start]);
				for(var i = 0; i < btnArr.length; i++){
					$(btnArr[i]).mouseenter(function(){
					  btnArr.removeClass(btn_active);
						$(btnArr[start]).addClass(btn_active);
					  $(this).addClass(btn_active);
					});
					$(btnArr[i]).mouseleave(function(){
						btnArr.removeClass(btn_active);
						$(btnArr[start]).addClass(btn_active);
					});
				}// end for
				El.animate({
					opacity: 1
				}, 200, function(){
					setRedo = setTimeout(function(){
						start += 1;	
						Roll( start, 
								  El, 
									dataArr, 
									duration, 
									btnArr, 
									btn_active, 
									outLink, 
									outLinkStatus);
					}, duration);
				});
			});
	}; //end Roll

	// 页面加载即开始滚动:
	Roll( 0, 
				$("#Billboard"), 
			  billboardLeft, 
				10000,
				$(".btn"), 
				"btn_active", 
				$(".index-gotoxiaomi"), 
				fontColors
			);

	//点击大轮播图下的对应按钮:
	$(".btn").click(function(){
		var data = parseInt( $(this).attr("data") );
		clearTimeout(setRedo);
		Roll( data, 
					$("#Billboard"), 
					billboardLeft,
					10000,
					$(".btn"),
					"btn_active",
					$(".index-gotoxiaomi"),
					fontColors
				);
	});


	//点击弹出浮窗：
	//视频地址列表：
	var videoArr = ['http://player.youku.com/embed/XNjQ4NzMwMzky', //左边视频的地址
				          'http://player.youku.com/embed/XNzQ3MjYzMDk2', //中间视频的地址
								  'http://player.youku.com/embed/XNzU1MjA1ODMy'];
	var wx2dcode = ['statics/img/wf_2dcode.jpg']; //微信二维码
	//handlePop用来控制视频或二维码等内容的弹出 | 参数列表说明
	//onBtn: 触发浮窗弹出的按钮集，每个按钮有序号标识
	//offBtn: 使弹窗关闭的元素
	//Pop: 弹出的部分，包括蒙版和视频容器
	//subModel: 弹出窗口里的子元素内容，可以是视频，或二维码
	//arr: 视频地址或者二维码图片地址列表
	function handlePop( onBtn, offBtn, Pop, subModel, arr ){
		onBtn.click(function(){
			Pop.show();
			subModel.show();
			var n = parseInt( $(this).attr('data') );
			if(n < 100){
			  Pop.find('.rls').attr('src', arr[n]);
			}
		});
		offBtn.click(function(){
			Pop.find('.rls').attr('src', '');
			subModel.hide();
			Pop.hide();
		});
	};

	//首页视频弹窗
	handlePop( $('.promo_video'), $('.pcls'), $('.Pop'), $('.subModel_video'), videoArr );

	//页脚微信二维码弹窗
	handlePop( $('#wxNum'), $('.pcls'), $('.Pop'), $('.subModel_2dcode'), wx2dcode );

	//公测页视频弹窗
	handlePop( $('#openVideo'), $('.pcls'), $('.Pop'), $('.subModel_video'), videoArr );

	//开放平台页提示弹窗
	//handlePop( $('#openJoin'), $('.pcls'), $('.Pop'), $('.subModel_open') );

	//下载页点击弹出二维码
	$(".dl_scan").click(function(){
	  var codeImg = $(this).attr("data"); //二维码图片地址
		$(".Pop2d").show();
		$(".pop2dcode").attr("src", codeImg);
		$(".pcls").click(function(){
			$(".Pop2d").hide();
			$(".pop2dcode").attr("src", "");
		});
	});

	//页面中使用img元素嵌入的图片，将在Retina屏下被替换为高品质图片：
	function toRetina( img ){ //参数img是图片img元素
		var src2x = $(img).attr("data-src2x"); //拿到高品质图片地址
		if( src2x ){
		  $(img).attr("src", src2x); //替换img元素的src属性
		}
	}; //此方法只在window.devicePixelRatio > 1 时才被调用

	if( window.devicePixelRatio > 1 ){
		toRetina( $('.index_head_logo') );
		toRetina( $('.dl_head_logo') );
		toRetina( $('.pub_head_logo') );
		toRetina( $('.open_head_logo') );
		toRetina( $('.log_head_logo') );
		toRetina( $('.promo1_img') );
		toRetina( $('.promo3_img') );
		toRetina( $('.promo2_img') );
	};

	//下载页面中点击“查看更新日志”时，都在弹窗里显示最新更新日志，日志数据在miwifi_logdata.js里
	$(".seelog").click(function(){
		var me = $(this);
		var token = me.attr("data"); //这个参数用来区分是哪一个日志（ROM稳定版？ROM开发版？MiNi开发版？....）
		var logTitle = $(".popLogH1");
		var logCon = $(".logContent");
		$(".popLog").show();
		var datas = logDatas[token]; //根据token拿到对应的日志，包括标题和内容
		logTitle.html( datas[0] ); //展示对应标题
		logCon.html( datas[1] ); //展示对应日志
	});

	$(".pcls").click(function(){
		$(".popLog").hide();
	});

	//改版后下载页三个类别的切换：
	var dlNav = $(".dlNav"); //导航圆按钮li(整个li是鼠标响应区域)
	var dlArr = $(".dl_arrows li"); //箭头
	var dlCon = $(".dl_bodying li"); //内容
	var icons = $(".dlnav_icon"); //大按钮里的图标
	var txts = $(".dlspan"); //按钮里的文字
	$.fn.downloadNav = function( arrCls, conCls, txtCls, dlCls ){
		//参数是箭头、内容区、标题文字以及icon图标的class前缀，与token配合，指向对应元素
		function arrowSwitch( tkn ){
			dlArr.hide();
			$("." + arrCls + tkn).show();
		};
		function contentSwitch( tkn ){
			dlCon.hide();
			$("." + conCls + tkn).show();
		};
		function textSwitch( tkn ){
			txts.addClass("txtdim");
			$("." + txtCls + tkn).removeClass("txtdim");
		};
		function iconSwitch( tkn ){
			icons.addClass("dim");
			$("." + dlCls + tkn).removeClass("dim");
		};
		var me = $(this); //li
		var token = me.attr("data"); //标识类别，token和class前缀配合，指向对应元素
		me.mouseenter(function(){
			if( !me.hasClass("present") ){ //如果不是当前激活的按钮
				textSwitch( token );
				iconSwitch( token );
			}
		});
		me.mouseleave(function(){
			if( !me.hasClass("present") ){
				var pre_token = $(".present").attr("data");
				textSwitch( pre_token );
				iconSwitch( pre_token );
			}
		});
		me.click(function(){
			if( !me.hasClass("present") ){
			  dlNav.removeClass("present");
			  me.addClass("present");
			  arrowSwitch( token );
			  iconSwitch( token );
			  textSwitch( token );
			  contentSwitch( token );
			}else{
				return false;
			}
		});
	};

	for(var i = 0; i < dlNav.length; i++){
		$(dlNav[i]).downloadNav("dl_arr", "dlbody", "dlspan", "dlnav");
	}

})();


/* js for public */
$(function () {
			var goout = $('.goout'), gohome = $('.gohome'), getup = $('.getup');
			var header = $('.pack_header');
			var wrapmodel = $('.wrap').children('.model');
			var wrap = $('.wrap');
			//页面跳转
			var start = Number(window.location.href.split('#model')[1]) ? Number(window.location.href.split('#model')[1]) : 0;
			if(start==1){
				getup.show();
			}else if(start==2){
				goout.show();
			}else if(start==3){
				gohome.show();
			}else{
				header.show();
			}
			//移动鼠标玩法
			$(".rel").hover(function (e){
				e.preventDefault();
				$(this).children('.con').show();
			},function (e){
				e.preventDefault();
				$(this).children('.con').hide();
			});

			//各种模式下各智能家居想法
			var big=$(".model .list .txtbig"),small=$(".model .list .txtsmall");
			function bigSmallHover(i,flag){
				if(flag){
					big.eq(i).css('display','none');
					small.eq(i).css('display','block');
				}else{
					small.eq(i).css('display','none');
					big.eq(i).css('display','block');
				}
			}
			var index;
			$(".getup .left li").hover(function (e){
				e.preventDefault();
				index=$(this).index();
				bigSmallHover(index,true);
			},function (e){
				e.preventDefault();
				bigSmallHover(index,false);
			});


			$(".getup .right li").hover(function (e){
				e.preventDefault();
				index=$(this).index()+3;
				bigSmallHover(index,true);
			},function (e){
				e.preventDefault();
				bigSmallHover(index,false);
			});

			$(".goout .left li").hover(function (e){
				e.preventDefault();
				index=$(this).index()+6;
				bigSmallHover(index,true);
			},function (e){
				e.preventDefault();
				bigSmallHover(index,false);
			});

			$(".goout .right li").hover(function (e){
				e.preventDefault();
				index=$(this).index()+9;
				bigSmallHover(index,true);
			},function (e){
				e.preventDefault();
				bigSmallHover(index,false);
			});

			$(".gohome .left li").hover(function (e){
				e.preventDefault();
				index=$(this).index()+12;
				bigSmallHover(index,true);
			},function (e){
				e.preventDefault();
				bigSmallHover(index,false);
			});

			$(".gohome .right li").hover(function (e){
				e.preventDefault();
				index=$(this).index()+15;
				bigSmallHover(index,true);
			},function (e){
				e.preventDefault();
				bigSmallHover(index,false);
			});
			//模式切换
			function selectModel(hd,sw){
				hd.css('zIndex',2400);
				hd.fadeOut("400",function(){
				 });
				sw.css('zIndex',2500);
				sw.fadeIn("400",function(){
				});
			}

			var mod = 0;
			//宽屏下切换模式
			$(".open").bind('click',function (e){
				wrap.show();
				e.preventDefault();
				getup.show();
			});
			$(".up").bind('click',function (e){
				e.preventDefault();
				header.hide();
				if(mod === 0){
					header.show();
					getup.hide();
					return false;
				}
				
				if(mod === 1){
					selectModel(goout,getup);
				} else {
					selectModel(gohome,goout);
				}
				mod -= 1;

			});
			$(".down").bind('click',function (e){
				e.preventDefault();
				header.hide();
				if(mod === 2){
					wrapmodel.hide();
					mod = 0;
					header.show();
					return false;
				}
				if(mod === 0){
					selectModel(getup,goout);
				} else {
					selectModel(goout,gohome);
				}
				mod += 1;
			});
			
			// 窄屏下切换模式
			function modelHidden(objchange,ind){
				$('.pack_header').hide();
				wrapmodel.fadeOut('400',function(){
					wrapmodel.css('zIndex',2400);
				});
				objchange.fadeIn("400",function(){ 	
					objchange.css('zIndex',2500);
				});
				mod=ind;
			}
			$('.returnindex').bind('click',function (e){
					e.preventDefault();
					header.show();
					wrapmodel.hide();
			});
			$('.banner .banmer1').bind('click',function (e){
				modelHidden(wrapmodel.eq(0),0);
			});
			$('.banner .banmer2').bind('click',function (e){
				modelHidden(wrapmodel.eq(1),1);
			});
			$('.banner .banmer3').bind('click',function (e){
				modelHidden(wrapmodel.eq(2),2);
			});

});


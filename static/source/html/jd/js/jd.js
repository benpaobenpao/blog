/**
 * Created by WQ on 2014/9/3.
 */
(function () {
    var layout = document.querySelector( "#layout" );
    var pages = document.querySelectorAll( ".page" );
    var Height = layout.offsetHeight;
    var Width = layout.offsetWidth;

    var audio = document.querySelector( "audio" );
    var musicLogo = document.querySelector( ".music-logo" );
    var isStart = false;

    window.spHeight = Height;
    Z.onTouchStart( pages[0], function () {
        if ( isStart == false ) {
            musicLogo.classList.add( "playing" );
            audio.src="https://firstpage.blob.core.chinacloudapi.cn/vip/jd/music/bg.mp3";
            audio.play();
        }
        isStart = true;
    } );
    Z.onTap( musicLogo, function () {
        musicLogo.classList.contains( "playing" ) ? audio.pause() : audio.play();
        musicLogo.classList.toggle( "playing" );
    } );

    // var page5MapWidth = Height * 0.3194 * 511 / 384;
    // Z.insertCSSRules( {
    //     ".page5-arrow-point" : {
    //         left : (Width - page5MapWidth) / 2 + page5MapWidth * 0.3189 + "px"
    //     },
    //     ".page2-bh" : {
    //         left : (Width - Height * 0.45) / 2 + "px"
    //     },
    //     ".page3-img2" : {
    //         bottom : (Height * 0.4048 + 15) + "px",
    //         left : (Width / 2 + Height * 0.09 ) + "px",
    //         "-webkit-transform" : "translate3d(-50%,0,0)"
    //     },
    //     ".page3-img3" : {
    //         bottom : (Height * 0.2471 + 30) + "px",
    //         left : (Width / 2 - Height * 0.09 ) + "px",
    //         "-webkit-transform" : "translate3d(-50%,0,0)"
    //     }
    // } );

    
    pages[0].onCut = function () {
        setTimeout( function () {
            pages[0].classList.add( "animate" );
        }, 0 );
    };

    pages[0].onRemove = function () {
        this.classList.remove( "animate" );
    };

    
    pages[1].onCut = function () {
        pages[1].classList.add( "animate" );
    };

    pages[1].onRemove = function () {
        this.classList.remove( "animate" );
    };


    pages[2].onCut = function () {
        pages[2].classList.add( "animate" );
    };

    pages[2].onRemove = function () {
        this.classList.remove( "animate" );
    };

    // pages[3].onCut = function () {
    //     pages[3].classList.add( "animate" );
    // };

    // pages[3].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[4].onCut = function () {
    //     pages[4].classList.add( "animate" );
    // };

    // pages[4].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[5].onCut = function () {
    //     pages[5].classList.add( "animate" );
    // };

    // pages[5].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[6].onCut = function () {
    //     pages[6].classList.add( "animate" );
    // };

    // pages[6].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[7].onCut = function () {
    //     pages[7].classList.add( "animate" );
    // };

    // pages[7].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[8].onCut = function () {
    //     pages[8].classList.add( "animate" );
    // };

    // pages[8].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[9].onCut = function () {
    //     pages[9].classList.add( "animate" );
    // };

    // pages[9].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // var commentWall = sp.commentWall( document.querySelector( ".comment-wall" ), data.userPicData );
    // sp.onPointerDown( commentWall.querySelector( ".sphere-parent" ), function ( event ) {
    //     event.preventDefault();
    //     event.stopPropagation();
    // } );

    // pages[10].onCut = function () {
    //     commentWall.runAnimate();
    //     pages[10].classList.add( "animate" );
    // };

    // pages[10].onRemove = function () {
    //     commentWall.removeTips();
    //     commentWall.stopAnimate(); 
    //     this.classList.remove( "animate" );
    // };

    // pages[11].onCut = function () {
    //     pages[11].classList.add( "animate" );
    // };

    // pages[11].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[12].onCut = function () {
    //     pages[12].classList.add( "animate" );
    // };

    // pages[12].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[13].onCut = function () {
    //     pages[13].classList.add( "animate" );
    // };

    // pages[13].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };


    // pages[14].onCut = function () {
    //     pages[14].classList.add( "animate" );
    // };

    // pages[14].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[15].onCut = function () {
    //     console.log(15);
    //     pages[15].classList.add( "animate" );
    // };

    // pages[15].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    // pages[16].onCut = function () {
    //     pages[16].classList.add( "animate" );
    // };

    // pages[16].onRemove = function () {
    //     this.classList.remove( "animate" );
    // };

    var kpics = document.getElementsByTagName("img");
    var kpicsLen = kpics.length;
    var kpicsNum = kpicsLen;
    var arrImg = [];
    var loadElem = document.querySelector( ".loadNum" );

    var loadImgIndex = 0;

    var isloadedPics = false;

    for(var i=0;i<kpicsLen;i++){
        arrImg[i] = kpics[i].src;
    }




    function loadPics(arr,cbk){

        var len = arr.length,
            cbk = cbk || function(){};
            var imgFunc;
        (function(){
            var img = new Image();
                imgFunc= arguments;
            img.onload=function(){
                if(loadImgIndex==len-1){
                    cbk();
                }else{
                    loadImgIndex++;

                    loadElem.innerHTML = parseInt((loadImgIndex/len) * 100, 10) + "%";
                    
                    imgFunc.callee();
                }
                
            }
            img.src = arr[loadImgIndex];
            img.onerror = function(){
                //alert('图片加载出错')
                setTimeout(cbk, 5000);
            }
            
        })();
    }

    console.log(arrImg);

    loadPics(arrImg, function(){
        if(!isloadedPics){
            isloadedPics = true;
            document.body.removeChild( document.querySelector( ".page-loading" ) );
            lib.ScreenSystem( document.getElementById( "layout" ) );
        }
        
        console.log("加载完毕"); 
    });

    setTimeout(function(){
        if(!isloadedPics){
            isloadedPics = true;
            document.body.removeChild( document.querySelector( ".page-loading" ) );
            lib.ScreenSystem( document.getElementById( "layout" ) );
        }
    },100000);



    // for(var i=0;i<kpicsLen;i++){
    //     arrImg[i] = new Image();
    //     arrImg[i].src = kpics[i].src;
        

    //     if (arrImg[i].complete){
    //         arrImg[i].onload = (function(i){
    //             if (arrImg[i].complete){
    //                 kpicsNum--;
    //                 loadElem.innerHTML = (kpicsNum / kpicsLen).toFixed(2)+"%";
    //                 if(kpicsNum<=0){
    //                     document.body.removeChild( document.querySelector( ".page-loading" ) );
    //                     lib.ScreenSystem( document.getElementById( "layout" ) );
    //                 }
    //             }else{
    //                 kpicsNum--;
    //                 loadElem.innerHTML = (kpicsNum / kpicsLen).toFixed(2)+"%";
    //                 if(kpicsNum<=0){
    //                     document.body.removeChild( document.querySelector( ".page-loading" ) );
    //                     lib.ScreenSystem( document.getElementById( "layout" ) );
    //                 } 
    //             }
                
    //         })(i);
    //     }else{
    //         kpicsNum--;
    //         loadElem.innerHTML = (kpicsNum / kpicsLen).toFixed(2)+"%";
    //         if(kpicsNum<=0){
    //             document.body.removeChild( document.querySelector( ".page-loading" ) );
    //             lib.ScreenSystem( document.getElementById( "layout" ) );
    //         }
    //     }
    // }
    

})();

document.addEventListener( 'WeixinJSBridgeReady', function () {
    var WeixinJSBridge = window.WeixinJSBridge;

    // 发送给好友;
    WeixinJSBridge.on( 'menu:share:appmessage', function () {
        WeixinJSBridge.invoke( 'sendAppMessage', {
            "appid" : dataForWeixin.appId,
            "img_url" : dataForWeixin.picture,
            "img_width" : "120",
            "img_height" : "120",
            "link" : dataForWeixin.url,
            "desc" : dataForWeixin.desc,
            "title" : dataForWeixin.title
        }, function ( res ) {
        } );
    } );

    // 分享到朋友圈;
    WeixinJSBridge.on( 'menu:share:timeline', function () {
        WeixinJSBridge.invoke( 'shareTimeline', {
            "img_url" : dataForWeixin.picture,
            "img_width" : "120",
            "img_height" : "120",
            "link" : dataForWeixin.url,
            "desc" : dataForWeixin.desc,
            "title" : dataForWeixin.title
        }, function ( res ) {
        } );
    } );

    // 分享到微博;
    WeixinJSBridge.on( 'menu:share:weibo', function () {
        WeixinJSBridge.invoke( 'shareWeibo', {
            "content" : dataForWeixin.title + ' ' + dataForWeixin.url,
            "url" : dataForWeixin.url
        }, function ( res ) {
        } );
    } );

    // 分享到Facebook
    WeixinJSBridge.on( 'menu:share:facebook', function () {
        WeixinJSBridge.invoke( 'shareFB', {
            "img_url" : dataForWeixin.picture,
            "img_width" : "120",
            "img_height" : "120",
            "link" : dataForWeixin.url,
            "desc" : dataForWeixin.desc,
            "title" : dataForWeixin.title
        }, function ( res ) {
        } );
    } );
}, false );
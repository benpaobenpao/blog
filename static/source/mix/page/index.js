jQuery.noConflict();

// jQuery(function(jQuery){



var count = 5;

// _id 唯一索引值
// _type 类型   1-文字    2-图片    3-声音   4-背景
// _name 类型名称  文字   图片   声音
// _checked  当前图层被选中的  true为被点击  false为未被点击
// _clicked  当前组被选中的   true为被点击  false为未被点击
// _open  组展开或者收缩   true为展开   false为收缩
// visiblity 是否可见  true 为可见  false为不可见
// zIndex  图层值  与  _id 值相同  即数组的索引值
// children 包含的图层


// 添加组或图层时追加到末尾  整体的ID值不需要变动
// 编辑组或图层时   整体的ID值不需要变动
// 删除组或图层时   删除之后的ID都需要减一
// 


var ZINDEX = 9999;

var kscope = null;
var kCurP = null;
var kCurB = null;

function datasController($scope) {
    kscope = $scope;
    $scope.datas = [{
        _id: 0,   
        _type: 4,
        _name: "组",
        _checked: true,
        _open: true,
        visibility: true,
        zIndex: 0,
        children: [{
            _p: 0,
            _id: 0,
            _type: 1,
            _name: "文字",
            _checked: true,
            color: "#000",
            fontSize: 14,
            width: 100,
            height: 100,
            lineHeight: 20,
            letterSpacing: 0,
            bold: false,
            italic : false,
            textAlign: "left",
            left: 100,
            top: 100,
            zIndex: 0,
            value : "我是字体",
            visibility: true,
            effect: "slideOutLeft",
            delay : 1

        }, {
            _p: 0,
            _id: 1,
            _type: 1,
            _name: "文字", 
            _checked: false,
            color: "#f00",
            fontSize: 34,
            width: 100,
            height: 100,
            lineHeight: 20,
            letterSpacing: 0,
            bold: false,
            italic : false,
            textAlign: "center",
            left: 100,
            top: 100,
            zIndex: 1,
            value : "字体哈哈哈放大",
            visibility: true,
            effect: "flash",
            delay : 0
        }, {
            _p: 0,
            _id: 2,
            _type: 2,
            _name: "图片",
            _checked: false,
            color: "#000",
            fontSize: 14,
            width: 100,
            height: 100,
            left: 100,
            top: 100,
            zIndex: 2,
            value : "http://s3.51cto.com/wyfs02/M01/6B/DD/wKioL1U4rzOBwZ2rAACRuMeKbnY429.jpg",
            visibility: true,
            effect: "flash",
            delay : 0
        },{
            _p: 0,
            _id: 3,
            _type: 1,
            _name: "文字",
            _checked: false,
            color: "#000",
            fontSize: 14,
            width: 100,
            height: 100,
            lineHeight: 20,
            letterSpacing: 0,
            bold: false,
            italic : false,
            textAlign: "left",
            left: 100,
            top: 100,
            zIndex: 0,
            value : "看看",
            visibility: true,
            effect: "rollIn",
            delay : 1

        }]
    }, {
        _id: 1,
        _type: 4,
        _name: "组",
        _checked: false,
        _open: true,
        visibility: true,
        zIndex: 1,
        children: [{
            _p: 1, 
            _id: 0,
            _type: 1,
            _name: "文字",
            _checked: false,
            color: "#000",
            fontSize: 14,
            width: 100,
            height: 100,
            lineHeight: 20,
            letterSpacing: 0,
            bold: false,
            italic : false,
            textAlign: "left",
            left: 100,
            top: 100,
            zIndex: 0,
            value : "我是字体阿斯顿发撒旦法水电费",
            visibility: true,
            effect: "bounceInDown",
            delay : 1

        }]
    }];


    $scope.curLayerDatas = null;

    var inputTxtDropdown = jQuery(".inputTxtDropdown");


    $scope.curGroupLayersClick = function(p){
        for(var o in $scope.datas){
            if(p==o){
                $scope.datas[o]._checked = true;
            }else{
                $scope.datas[o]._checked = false; 
            }
        }
        jQuery(".k_curLayer").removeClass("k_curLayer");
    }


    $scope.isLayerVisible= function(v,p,b,$event){
        $event.stopPropagation(); 
        console.log(v);
        $scope.datas[p].children[b].visibility = !v;
        
    }

    // 图层点击事件
    $scope.curLayerClick = function(p,b,$event){
        $event.stopPropagation();
        $scope.curLayerDatas = $scope.datas[p].children[b];

        console.log(p,b);

        for(var po in $scope.datas){
            for(var bo in $scope.datas[po].children ){
                if(b == bo && p == po ){
                    $scope.datas[po].children[bo]._checked = true;
                }else{
                    $scope.datas[po].children[bo]._checked = false;
                }
            }
        } 

        // for(var o in $scope.datas[p].children){
        //     if(b==o){
        //         $scope.datas[p].children[o]._checked = true;
        //     }else{
        //         $scope.datas[p].children[o]._checked = false;
        //     }
        // }

        inputTxtDropdown.find("option[value='"+ $scope.curLayerDatas.effect +"']").attr("selected","selected");
    }

    

    inputTxtDropdown.change( function(){
        var anim = jQuery(this).val();

        console.log("aa"); 

        console.log(anim);

        $scope.curLayerDatas.effect = anim;

        jQuery('.k_phone').find("[_checked='true']").removeClass().addClass(' animated ' + anim ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          jQuery(this).removeClass(); 
        });
    }); 


    $scope.isBoxTxtShow = true;
    $scope.isGroupAttrShow = true;
    $scope.boxTxtVal = "";

    $scope.boxTxtSave = function() {
        console.log($scope.boxTxtVal);

        kCurP = jQuery(".k_curGroupLayers").attr("_id");

        console.log(kCurP);

        for(var o in $scope.datas[kCurP].children){
            $scope.datas[kCurP].children[o]._checked = false;
        }

        var tmpData = {
            _p: kCurP,
            _id: $scope.datas[kCurP].children.length,
            _type: 1,
            _name: "文字", 
            _checked: true, 
            color: "#000",
            fontSize: 14,
            width: 100,
            height: 100,
            lineHeight: 20,
            letterSpacing: 0,
            bold: false,
            italic : false,
            textAlign: "center",
            left: 100,
            top: 100,
            zIndex: $scope.datas[kCurP].children.length, 
            value : $scope.boxTxtVal,
            visibility: true
        };

        console.log($scope.boxTxtVal);

        $scope.datas[kCurP].children.push(tmpData);
        $scope.isBoxTxtShow = !$scope.isBoxTxtShow;

        console.log($scope.datas);

    }

    $scope.boxTxtShow = function() {
        $scope.boxTxtVal = "";
        $scope.isBoxTxtShow = !$scope.isBoxTxtShow;
    }

    $scope.boxTxtClosed = function() {
        $scope.isBoxTxtShow = !$scope.isBoxTxtShow;
    }




    // 字体属性编辑
    // 字体大小设置
    $scope.setFontSize = function(p,b){
        console.log( p , b);
        $scope.datas[p].children[b] = $scope.curLayerDatas;
    };


    $scope.setFontColor = function(p,b){
        console.log( p , b);
        kCurP = p;
        kCurB = b;

        console.log("click");
    }


    // left
    $scope.setFontLeft = function(p,b){
        $scope.datas[p].children[b] = $scope.curLayerDatas;
    }

    // top
    $scope.setFontTop = function(p,b){
        $scope.datas[p].children[b] = $scope.curLayerDatas;
    }


    $scope.setFontColorChange = function(p,b){
        // $scope.curLayerDatas;
        $scope.datas;
        console.log("change..."); 
    }


    
    // jQuery("#kFontColor").colorpicker({
    //     fillcolor:true,
    //     success:function(o,color){
    //         jQuery(o).css("background",color);
    //         // $scope.curLayerDatas.color = color;
    //         // $scope.datas[p].children[b] = $scope.curLayerDatas;
    //     }
    // });

    // 设置字体行间距
    $scope.setFontLineHeight = function(p,b){
        $scope.datas[p].children[b] = $scope.curLayerDatas;
    }

    // 设置字体间距
    $scope.setFontLetterSpacing = function(p,b){
        $scope.datas[p].children[b] = $scope.curLayerDatas;
    } 


     jQuery(function(){
        jQuery("#kFontColor").colorpicker({fillcolor:true, success: function(o,color){
            jQuery(o).css("background",color);
            // console.log(color);
            // jQuery(o)[0].value = color;
            
            // jQuery(o)[0].click();

            $scope.curLayerDatas.color = color;
            $scope.datas[kCurP].children[kCurB].color = color; 

            jQuery(o)[0].click();
 
           
        }});
    });

}


// 字体颜色设置
    // if(jQuery("#kFontColor").length){
    // 

        // jQuery("#kFontColor").colorpicker({fillcolor:true,});
    // }

// });
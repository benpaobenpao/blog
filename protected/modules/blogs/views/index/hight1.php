<?php $this->pageTitle="添加博文"; ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/kindeditor/themes/default/default.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/kindeditor/kindeditor-min.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/kindeditor/lang/zh_CN.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerCssFile(Yii::app()->params["static"] .'/plugs/highlight/styles/solarized_dark.css');  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/highlight/highlight.pack.js',CClientScript::POS_END);  ?>
<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->params["static"] .'/plugs/Validform_v5.3.2.js',CClientScript::POS_END);  ?>

<pre>
    <code class="html">
        &lt;div&gt;ddd&lt;/div&gt;
    </code>
</pre>

<pre>
    <code  class="js">
        var a = 10;
    </code>
</pre>

<pre>
    <code class="css">
        body{color: #ff0;}
    </code>
</pre>
<input id="title" type="text" placeholder="" value="<?php echo $data['title'];?>">
<input type="radio" 
<textarea id="article" name="content" style="width:700px;height:200px;visibility:hidden;"><?php echo $data['article'];?><br></textarea>
<div><input id="btnSave" type="button"  value="保存"></div>
<style>
        *{margin:0; padding: 0;}
			form {
				margin: 0;
			}
			textarea {
				display: block;
			}
                        .ke-icon-light {
				background-image: url(<?php echo Yii::app()->params["static"]; ?>/plugs/kindeditor/themes/default/default.png);
				background-position: 0px -960px;
				width: 16px;
				height: 16px;
			}
			.ke-icon-example1 {
				background-image: url(<?php echo Yii::app()->params["static"]; ?>/plugs/kindeditor/themes/default/default.png);
				background-position: 0px -672px;
				width: 16px;
				height: 16px;
			}
			.ke-icon-example2 {
				background-image: url(<?php echo Yii::app()->params["static"]; ?>/plugs/kindeditor/themes/default/default.png);
				background-position: 0px -672px;
				width: 16px;
				height: 16px;
			}
                        
                        
                        .kindEditor-light{
                            position: fixed;
                            left: 50%;
                            top: 50%;
                            z-index: 9999;
                            width: 600px;
                            height: 500px;
                            border: 1px solid #A0A0A0;
                            margin: -250px 0 0 -300px;
                            background: #fff;
                        }
                        
                        .kindEditor-light .ktitle{
                            position: relative;
                            height: 24px;
                            line-height: 24px;
                            padding-left: 12px;
                            font-size: 14px;
                            background: url(<?php echo Yii::app()->params["static"]; ?>/plugs/kindeditor/themes/default/background.png) repeat scroll 0 0 #F0F0EE;
                        }
                        
                        .kindEditor-light .ktitle .kclosed{
                            position: absolute;
                            right: 10px;
                            top: 5px;
                            color: #333;
                            /*text-decoration*/
                        }
                        
                        .kindEditor-light .kmain{
                            padding: 10px 20px;
                        }
                        
                        .kindEditor-light .kmain .txt{
                            display: block;
                            height: 360px;
                            font-family: "sans serif",tahoma,verdana,helvetica;
                            font-size: 12px;
                            border-color: #848484 #E0E0E0 #E0E0E0 #848484;
                            border-style: solid;
                            border-width: 1px;
                            padding: 10px;
                            margin: 10px 0;
                            overflow: hidden;
                        }
                        
                        .kindEditor-light .kmain .txt textarea{
                            width: 100%;
                            height: 100%;
                            border: none;
                            resize: none;
                            outline-style: none;
                        }
                        
                        .kindEditor-light .kmain .operate{
                            text-align: center;
                        }
                        
                        .kindEditor-light .kmain .operate input {
                            width: 80px;
                            height: 20px;
                            margin: 0 8px;
                        }
                        
                        .kindEditor-light-bg{
                            position: fixed;
                            left: 0;
                            top: 0;
                            z-index: 9000;
                            width: 100%;
                            height: 100%;
                            background: rgba(255,255,255,0.6);
                        }
		</style>
<script>
    $(document).ready(function() {
//        hljs.initHighlightingOnLoad();
    KindEditor.lang({
       light: "高亮" 
    });
    
    
    KindEditor.plugin("light", function(K){
       var _this = this, name = "light";
        _this.clickToolbar(name, function(){
            var html = '<div class="kindEditor-light">';
            html += '<div class="ktitle"><strong>插入程序代码</strong><a class="kclosed" href="javascript:void(0);">X</a></div>';
            html += '<div class="kmain"><select class="language"><option value="javascript">javascript</option><option value="c++">c++</option><option value="c#">c#</option><option value="PHP">PHP</option><option value="java">java</option><option value="Objective C">Objective C</option><option value="swift">swift</option><option value="python">python</option><option value="ruby">ruby</option><option value="lua">lua</option><option value="SQL">SQL</option><option value="css">css</option><option value="html">HTML</option><option value="XML">XML</option><option value="nginx">nginx</option><option value="apache">apache</option><option value="javascript">others</option></select>';
            html += '<div class="txt"><textarea></textarea></div><div class="operate"><input class="kindEditor-light-ok" type="button" value="确定"><input class="kindEditor-light-cancel kclosed" type="button" value="取消"></div></div>';
            html += '</div><div class="kindEditor-light-bg"></div>';
            $("body").eq(0).append(html);
        });
        

        
        $(document).on("click", ".kindEditor-light-ok", function(){
            var lang = $(".kindEditor-light .language option:selected").val();

            
            var fragment = $(".kindEditor-light textarea").val();
            
            if("html" === lang){
                fragment = fragment.replace(/</ig, "&lt;").replace(/>/ig,"&gt;"); 
            }
            
            var html = '<pre class="'+ lang +'">'+ fragment + "</pre>";
            
            _this.insertHtml(html);

    
//            var cbody =$( kindEditorIframe.window.document.getElementsByTagName("body")[0]);
//            cbody.find('pre').each(function(i, block) {
//                  hljs.highlightBlock(block);
//            });
            
            $(".kindEditor-light,.kindEditor-light-bg").remove();
        });
        
        $(document).on("click", ".kindEditor-light .kclosed", function(){
            $(".kindEditor-light,.kindEditor-light-bg").remove();
        });
        
        // 保存
        $(document).on("click","#btnSave", function(){
//            console.log(_this.html());
            var title = $("#title").val();
            var article = $(kindEditorIframe.window.document.getElementsByTagName("body")[0]).html();
            
            console.log(article);
            
//            $.ajax({
//   type: "POST",
//   url: "/blog/index.php?r=blogs/index/add",
//   data: "name=John&location=Boston",
//   dataType:"json", 
//   success: function(msg){
//     alert( "Data Saved: " + msg );
//   }
//});

console.log($(kindEditorIframe.window.document.getElementsByTagName("body")[0]).html());
            
            $.post(GURL + "?r=blogs/index/add", { "title": title, "article": article },
             function(data){
        
              alert("Data Loaded: " + data);
            },"json");
            
        });
        
    });
    
    
    
    
       
        
        KindEditor.ready(function(K) {
                K.create('#article', {
                    newlineTag: "br",
                    pasteType: 1,
                    resizeType : 0,
                    allowPreviewEmoticons: true,
                        cssPath : ['<?php echo Yii::app()->params["static"]; ?>/plugs/highlight/styles/solarized_dark.css'],
                        items : ['source', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
						 'insertorderedlist',
						'insertunorderedlist', 'emoticons', 'image', 'link',  'light' ]
                });
                
                console.log($("#article").val());
                
                var loadHTML = $("#article").val().replace(/<span class="hljs-tag"><<\/span>/ig,'<span class="hljs-tag">&lt;</span>').replace(/<span class="hljs-tag">><\/span>/ig,'<span class="hljs-tag">&gt;</span>');
//                $(loadHTML).find(".html .hljs-tag,.xml .hljs-tag").each(function(){
//                    $(this).text().replace(/</ig,"&lt;").replace(/>/ig,"&gt;");
//                });
                console.log(loadHTML);
//                $( kindEditorIframe.window.document.getElementsByTagName("body")[0])[0].innerHTML = ();

//$("body")[0].innerHTML = ($("#article").val());
                
                $(kindEditorIframe.window.document.getElementsByTagName("body")[0]).on("click", function(){
                  var $this = $(this);
                  if("br" !== ($this.children().last()[0].tagName).toLowerCase()){
                      $this.append("<br>");
                  }
                  
                });
                
//                    $( kindEditorIframe.window.document.getElementsByTagName("header")[0]).append(GSTATIC + '/plugs/highlight/styles/solarized_dark.css');
//                    cbody.find('pre code').each(function(i, block) {
//                          hljs.highlightBlock(block);
//                    });
        });
        });
</script>


<script>
    $(document).ready(function() {
//        $('pre code').each(function(i, block) {
//          hljs.highlightBlock(block);
//        });
      });
</script>


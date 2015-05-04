/*
* scripts for miwifi - F&Q 
* Create on 2014-09-26 15:25
* Latest modified 2014-10-13 18:39
*/
(function(){

	//F&Q数据都放在数组里来存储并调用：
	//在文章中需要出现的链接，放在外部函数中缓存，并在数组中手动调用，避免字符混乱
	var link_address = "http://www.miwifi.com/";
	var link_addIP = "http://192.168.31.1/";
	var link_wifisul = "http://bbs.xiaomi.cn/thread-10421413-1-1.html";
	var link_wifiBuy = "http://www.mi.com/miniwifi";
	var link_wifiApp = "http://bbs.xiaomi.cn/thread-10289300-1-1.html";
	var link_kuaipan = "http://www.kuaipan.cn";
	var link_wifiHelp1 = "http://bbs.xiaomi.cn/thread-10566514-1-1.html";
	var link_wifiFail1 = "http://bbs.xiaomi.cn/thread-10225921-1-1.html";
	var link_wifiFail2 = "http://bbs.xiaomi.cn/thread-10327994-1-1.html";
	var link_wifiCodes = "http://bbs.xiaomi.cn/thread-10615512-1-1.html";
	var link_wifiOther = "http://bbs.xiaomi.cn/thread-9025297-1-1.html";
	var link_wifiDownload = "http://mi1.cc/down302?c=100_1_miwifi_PC";
	//titles是一级标题，展示在页面左侧导航的下拉菜单里，contents是对应内容，展示在页面右侧
	var FAQ_r1d = {
		token: "_r1d", //与页面对应按钮元素的id相对应
		conTitle: "小米路由器常见问题与解决方法（也适用于小米路由器mini）", //内容区的大标题
		titles: [ "基础使用", "高级功能", "异常排查", "其他问题" ],
		contents: [
		  [
			  {
					"Ask": "后台管理页面的地址是多少?",
					"Answer": "路由器后台管理界面的地址为<a href=\"" + link_address + "\" target=\"_blank\">www.miwifi.com</a>，也可在浏览器中输入<a href=\"" + link_addIP + "\" target=\"_blank\">192.168.31.1</a>进行访问。"
					},
			  {
					"Ask": "忘记了管理密码怎么办？",
					"Answer": "可以通过重置路由器的方法来解决。"
					},
			  {
					"Ask": "如何重置路由器？重置后会清除硬盘数据吗？",
					"Answer": "用较细的物体长按路由器背面的reset键8秒钟即可重置路由器。重置路由器不会清除硬盘内保存的个人数据，会重置所有的设置信息。"
					},
			  {
					"Ask": "指示灯的不同颜色分别代表什么意思？",
					"Answer": "可根据指示灯的颜色和是否闪烁来判断路由器状态：<br>蓝灯亮：系统正常运行，uboot刷机成功。<br>蓝灯闪烁：系统有新版本可更新。<br>黄灯亮：Boot启动中，系统启动中，路由器reset。<br>黄灯闪烁：硬盘格式化，修复硬盘状态，uboot刷机状态。<br>红灯亮：系统崩溃，uboot刷机失败。<br>红灯闪烁：进入小系统模式或者恢复系统模式。"
					},
			  {
					"Ask": "路由器管理密码和WiFi密码的区别。",
					"Answer": "路由器管理密码是登陆路由器后台管理界面所需要输入的密码；WiFi密码是手电、电脑、pad等上网设备连接WiFi时所需要输入的密码。为了保护您路由器的管理后台不被他人访问，建议将路由器管理密码和WiFi密码设置为不同密码。"
					},
			  {
					"Ask": "路由器固件（ROM）升级的方式。",
					"Answer": "您可以在路由器后台管理界面www.miwifi.com中检测新版本并升级，也可以在手机app中检测新版本并升级；同时可以在路由器后台管理界面上传固件（ROM）来进行手动升级。"
					},
			  {
					"Ask": "路由器2.4G WiFi和5G WiFi的区别是什么？我的手机为什么连不上5G？",
					"Answer": "以前广泛使用的WiFi多数是基于IEEE 802.11n（第四代）无线标准，其工作频段多数在2.4GHz，所以被称为2.4G WiFi；而最新一代的无线标准IEEE 802.11ac（第五代），其工作频段在5GHz，所以被称为5G WiFi，其具有传输速率快、干扰少等特点。<br>小米路由器支持5G频段，连接5G WiFi，需要您的上网设备也同时支持5G频段。"
					},
			  {
					"Ask": "我的设备支持5G WiFi，为什么搜索不到5G WiFi信号？",
					"Answer": "5G信道有很多，目前国内只允许开启部分信道，其他的都不可用。部分用户购买的俗称非“国行”的手机可能工作在国内不支持的信道。遇到此类问题，请不要把信道设置为36-64；一般情况下正常终端应该都会支持149-165，您可以尝试将信道设置在此范围内然后再试。"
					}
			], //第一个title对应的内容结束
			[
			  {
					"Ask": "想对路由器指定文件夹进行云备份，如何操作呢？",
					"Answer": "手机app端打开路由存储-路由器云备份页面，可勾选“不需要备份的文件夹”，即可对指定的文件夹进行云备份。"
					},
			  {
					"Ask": "开启智能场景，定时休眠，机器开启后无法上网。",
					"Answer": "此时可以重启路由器（通过插拔电源重启）。部分用户可能会遇到这个问题，我们正在努力解决该问题。"
					},
			  {
					"Ask": "我插在路由器上的U盘不识别怎么办？",
					"Answer": "小米路由器的USB目前支持多种文件系统，包括：Fat，Fat32，Exfat，ext3，ext4，NTFS。U盘成功挂载后，可在手机App，PC/Mac客户端等文件管理系统管理文件。"
					},
			  {
					"Ask": "开启了无线访问控制后，路由快连功能无法使用。",
					"Answer": "这是正常的，无线访问控制的原理是只允许相应的MAC地址连接，拒绝其他连接，使用路由快连功能前，需确保无线访问控制是关闭的。"
					},
			  {
					"Ask": "如何看小米路由器里的文件？",
					"Answer": "只需连接到小米路由器WiFi，手机或平板打开小米路由器的app，通过文件管理即可浏览查看。访客或不能安装小米路由器App的设备，可以使用支持Samba或Dlna的文件管理器查看路由盘内容。电脑除使用Win/Mac客户端软件访问外，Windows可直接在“运行”中访问\\\\192.168.31.1，Mac使用finder连接smb:\/\/192.168.31.1。"
					},
			  {
					"Ask": "把小米路由器硬盘里的文件通过路由器的usb拷到u盘上，为什么那么慢。（小米路由器mini无内置硬盘，可忽略此问题）",
					"Answer": "请用手机app操作，可以达到最快速度。如果用pc操作，数据会发生中转，影响速率。"
					},
			  {
					"Ask": "USB接口或网络盘复制或打开文件时，有时会提示“文件路径太深，无法打开或复制”。",
					"Answer": "在手机app上对大量文件批量操作会出现这个问题，目前已经有所优化，可以批量操作更多文件了；如果依然报错，可尝试分批操作。接下来我们将做更多优化，让操作无限制。"
					}
			], //第二个title对应的内容结束
			[
			  {
					"Ask": "使用5G WiFi时不稳定，2.4G WiFi使用正常。",
					"Answer": "在距离远或穿墙的情况下，5G WiFi的信号强度会弱于2.4G WiFi（5G频率高，穿墙弱），在5G WiFi信号很弱的情况下，建议切换至2.4G WiFi。"
					},
			  {
					"Ask": "可以看到WiFi，但是连接时总是卡在身份验证。",
					"Answer": "可能是WiFi密码被修改了，可尝试在上网设备（手机、电脑、pad等）WiFi设置中删除当前网络，然后重新连接该WiFi输入密码。"
					},
			  {
					"Ask": "网速很慢，无论无线、有线，下载和打开网页速度都很慢。",
					"Answer": "（1）如果路由器很久没有更新过ROM，请先尝试检查更新ROM。<br>（2）可先使用手机app的网络检测功能，检查路由器状态，可根据情况，重启一下路由器（先关机，再重新插电）。<br>（3）若无效，再检查网络设置，是否开启了QoS限速，关闭QoS后重试。<br>（4）根据网络类型，如果是拨号上网，可以尝试重启一下猫；如果在更复杂的办公网络，可以询问运维人员是否对路由器做了限制。"
					},
			  {
					"Ask": "无线网络不稳定，经常掉线，下载和拷贝速度慢。",
					"Answer": "（1）将路由器放置在合适的高度与位置保证信号覆盖，并使路由器远离（大于3米）电磁炉、微波炉、电冰箱、蓝牙设备等防止信号干扰。<br>（2）调整WiFi信号强度至穿墙模式。<br>（3）如果路由器很久没有更新过ROM，请先尝试检查更新ROM。<br>（4）尝试手动更改信道，2.4G WiFi可尝试1,6,11信道。若无效，还可以尝试更新无线网卡的驱动。"
					},
			  {
					"Ask": "拨号上网失败，显示691错误（用户名密码错误），该如何解决？",
					"Answer": "（1）再次确认用户名密码，重新输入。<br>（2）关闭猫（路由）15分钟重新连接电源拨号。<br>（3）克隆之前可以拨号成功的路由器mac重新拨号。<br>（4）确认用户宽带账户是否被运营商锁死，在之前路由上输错密码拨号断电，5分钟后，用小米路由器重新拨号。<br>（5）当小米路由器的WAN口与特定型号的光猫连接后网线接口旁的指示灯不亮时，首先排除路由器本身的硬件故障，用网线直接把小米路由器的WAN口和LAN口连接在一起，如果网线接口旁边的指示灯正常亮起，代表小米路由器的硬件是正常的，可以换一根质量更好的网线连接猫。"
					},
			  {
					"Ask": "拨号上网失败，显示“WAN口未连接”，但已经连接了猫和路由的WAN口。",
					"Answer": "检查一下路由器的WAN口指示灯有没有亮，若未亮灯，可尝试更换质量更好一些的网线。若灯亮，可以尝试重启一下猫。"
					}
			], //第三个title对应的内容结束
			[
			  {
					"Ask": "为什么我关机了以后风扇还会再转呢？（小米路由器mini无风扇，可忽略此问题）",
					"Answer": "软关机后风扇需要一段时间来为主板散热，需要使主板温度降到合适的数值后才会关闭，具体时间不定。"
					},
			  {
					"Ask": "小米路由器的2.4G频段不是300M么？为什么无线的连接属性显示的连接速度远远不够呢？",
					"Answer": "300M是802.11n模式的最高理论速率，但是这个还需要客户端支持。目前 WiFi在40Mhz带宽工作时才会达到300Mhz的速率，但是目前2.4G比较拥挤，40Mhz带宽可能不如在20Mhz工作情况好。WiFi根据环境情况自动切换到20Mhz带宽，所以显示的协商速率可能或降低。而且根据信号强度的变化，客户端和路由器的协商速率会随时变化。"
					},
				{
					"Ask": "不同型号路由器之间电源适配器可以交换使用吗？",
					"Answer": "不可以。为保证路由器能够正常工作及防止损坏，请使用该型号路由器原装标配电源适配器。小米路由器电源适配器输出电压/电流：12V/2.5A；小米路由器mini电源适配器输出电压/电流：12V/1A。"
					}
			] //第四个title对应的内容结束
		]
	}; // end FAQ_r1d

	var FAQ_wifi = {
		token: "_wifi", //与页面对应按钮元素的id相对应
		conTitle: "小米随身WiFi常见问题与解决方法", //内容区的大标题
		titles: [ "创建连接", "密码设置", "网络信号", "手机App", "云U盘", "其他问题" ],
		contents: [ 
		  [
			  {
					"Ask": "小米随身WiFi如何使用？",
					"Answer": "将小米随身WiFi插入已联网的电脑，即可创建无线网络，分享给其他手机、平板电脑、电脑等。它依靠电脑网络来创建无线网络，所以需要插在一台可以上网的电脑上才能正常使用。"
					},
			  {
					"Ask": "如何创建WiFi信号？为何我的随身WiFi插入电脑后没有反应？",
					"Answer": "需要下载安装驱动后，再插入小米随身WiFi。<a href=\"" + link_wifiDownload + "\" target=\"_blank\">点击这里下载</a>。"
					},
			  {
					"Ask": "创建成功后，手机等设备如何连接？",
					"Answer": "为了您的网络安全，创建WiFi成功后，小米随身WiFi默认设置随机密码，您需要在手机等设备端打开WiFi网络，找到名称为“xiaomi-xxxx”的无线网络，输入电脑端小米随身WiFi程序上显示的密码，即可连接。在您修改WiFi名称和密码后，请重新启动随身WiFi，移动设备也需要重新打开连接新的无线网络。"
					},
			  {
					"Ask": "电脑未联网，可以使用随身WiFi吗？",
					"Answer": "小米随身WiFi依靠电脑网络来创建无线网络。电脑未联网时，随身WiFi只能当普通无线网卡使用。"
					},
			  {
					"Ask": "电脑休眠、关机时，可以使用随身WiFi吗？",
					"Answer": "不能。小米随身WiFi依靠已经联网的电脑来创建无线网络，长时间使用时建议您保持电脑为开启状态或关闭电脑自动休眠功能。"
					},
			  {
					"Ask": "什么场景下，需要使用随身WiFi？",
					"Answer": "公司、校园、商旅以及台式电脑没有无线网卡等情况下，都可以使用随身WiFi。通过它创建WiFi，不仅能分享给手机、平板电脑、电脑，还能共享图片、音乐、电影等文件。"
					},
			  {
					"Ask": "网吧、学校、单位是否可以使用？",
					"Answer": "大多数环境下可以正常使用。部分环境中使用的上网客户端对网络共享进行限制，您可以尝试论坛中的<a href=\"" + link_wifisul + "\" target=\"_blank\">破解方法</a>。"
					},
			  {
					"Ask": "支持哪些操作系统？",
					"Answer": "目前支持Windows XP、Windows Vista、Windows7、Windows 8（8.1）的32/64位操作系统，暂时不支持Mac OS和linux操作系统的电脑。"
					},
			  {
					"Ask": "手机连上WiFi后，为什么打不开网页？ ",
					"Answer": "有可能您的电脑网络存在网络限制，如公司网络、校园网络限制等情况，您可以尝试论坛中的破解方法。"
					},
			  {
					"Ask": "如何购买小米随身WiFi？需要预约吗？",
					"Answer": "无需预约，强烈建议通过小米网<a href=\"" + link_wifiBuy + "\" target=\"_blank\">官方渠道购买</a>。"
					}
			], //第一个title对应的内容结束
		  [
			  {
					"Ask": "随身WiFi怎么设置密码？",
					"Answer": "随身WiFi客户端支持3种设备连接方式：密码连接、主人确认、无密码。<br>密码连接：首次安装后随身WiFi将随机生成密码。您可以将密码修改为至少8位的数字或字母，修改后需重启随身WiFi、移动设备也需要重新连接。<br>主人确认：手机等设备连入无线网络时，无需输入密码，但需要主人确认。未经您的同意，手机等设备无法连入网络。<br>无密码：任何设备都可以连接您的无线网络（不推荐，可能存在风险）。"
					},
			  {
					"Ask": "同一个随身WiFi插在别的电脑上，密码相同吗？",
					"Answer": "首次安装驱动后，小米随身WiFi会为您随机生成8位密码，每台电脑上密码是不同的。为方便使用，您可手动设置为相同的密码。"
					}
			], //第二个title对应的内容结束
		  [
			  {
					"Ask": "创建的无线网络信号如何？",
					"Answer": "理论上，信号在无承重墙、无干扰的情况下可以到达半径三十米的范围。实际覆盖范围与室内环境有关，穿墙后信号强度会有所降低，上网速度将受到影响。"
					},
			  {
					"Ask": "最多支持多少台设备同时连接？",
					"Answer": "小米随身WiFi理论上可以支持三十台设备同时上网。除支持手机上网外，也支持平板电脑或电脑等其它设备上网，多台设备同时上网时，速度将受到影响。"
					},
			  {
					"Ask": "小米随身WiFi能接收无线信号吗？",
					"Answer": "小米随身WiFi已包含无线网卡模式。它既可以创建WiFi共享给手机、平板等设备上网，也可以变身无线网卡连接其他WiFi热点。"
					},
			  {
					"Ask": "如何优化随身WiFi信号？",
					"Answer": "远离电源等干扰源，避免放置在体积较大的金属物体旁。如果在台式电脑上使用，请将随身WiFi插入主机机箱前面的USB接口。"
					}
			], //第三个title对应的内容结束
		  [
			  {
					"Ask": "小米随身WiFi手机App有什么功能？",
					"Answer": "目前手机等移动设备可通过小米随身WiFi App访问电脑端共享盘中的文件，轻松下载/上传文件。同时包括遥控PPT、远程电脑关机、锁屏等功能。<a href=\"" + link_wifiApp + "\" target=\"_blank\">参考这里</a>"
					},
			  {
					"Ask": "如何下载手机App？",
					"Answer": "可扫描小米随身WiFi电脑端共享盘中的二维码下载；可通过小米应用商店搜索“小米WiFi”下载。"
					},
			  {
					"Ask": "下载手机App成功后，为什么连不上共享盘？",
					"Answer": "使用小米随身WiFi手机App前，请先检查确认手机已连入小米随身WiFi创建的无线网络。只有在手机连入该无线网络的情况下，才能访问该随身WiFi共享盘中的文件。"
					}
			], //第四个title对应的内容结束
			[
			  {
					"Ask": "什么是云U盘？",
					"Answer": "小米随身WiFi云U盘可以备份、传输文件数据，绑定账号后，即赠送1T空间容量。它不占用电脑磁盘空间，能实现免数据线，跨平台同步数据。数据存储快速、安全、易用、实用。"
					},
			  {
					"Ask": "如何使用云U盘？",
					"Answer": "将小米随身WiFi插入电脑，电脑端界面点击云U盘图标或在点击计算机“云U盘”盘符，访问里面的文件。"
					},
			  {
					"Ask": "没有网络时，可以使用云U盘吗？",
					"Answer": "不能，云U盘是小米随身WiFi和金山快盘合作开发的产品，文件保存在云端服务器上，需要有网络才能使用。"
					},
			  {
					"Ask": "使用云U盘时，需要绑定账号吗？",
					"Answer": "为了您的数据安全，在首次使用时建议您绑定帐号（同一小米账号绑定的云U盘和MIUI快盘，可实现数据互通）；如果您还没有帐号，可快速注册。"
					},
			  {
					"Ask": "绑定账号后赠送的1T空间有使用时间限制吗？",
					"Answer": "没有时间限制，可永久免费使用。"
					},
			  {
					"Ask": "别人能看到存储在云U盘中的数据吗？",
					"Answer": "您云U盘中的数据，需通过绑定账号及密码访问，他人无法查看。绑定帐号后，即使随身WiFi不慎丢失，其中的数据也可随时通过您绑定的账号进行访问。"
					},
			  {
					"Ask": "我的随身WiFi丢了，存在云U盘里的文件怎么办？",
					"Answer": "使用云U盘时绑定/登录您的小米账号，若不慎丢失随身WiFi，可在金山快盘网站通过您绑定的账号访问数据：<a href=\"" + link_kuaipan + "\" target=\"_blank\">http://www.kuaipan.cn</a>"
					}
			], //第五个title对应的内容结束
			[
			  {
					"Ask": "设置隐藏WiFi后，为什么手机连不上网？",
					"Answer": "需删除原连接，手动输入原WiFi名称后即可重连。<a href=\"" + link_wifiHelp1 + "\" target=\"_blank\">参考解决方法</a>"
					},
			  {
					"Ask": "安装驱动后提示创建失败怎么办？",
					"Answer": "创建失败的情况可能与您Windows系统组件的缺失/禁用有关。如某些精简版的Windows系统会删除一部分系统网络组件，或者您的安全软件/防火墙禁止了网络共享功能，建议您通过下载安装Windows补丁、修改本地安全软件/防火墙配置来解决这样的问题。<br>参考解决方法：<a href=\"" + link_wifiFail1 + "\" target=\"_blank\">方法1</a>&nbsp;<a href=\"" + link_wifiFail2 + "\" target=\"_blank\">方法2</a>"
					},
			  {
					"Ask": "设置中文WiFi名称后，手机搜到是乱码该怎么办？ ",
					"Answer": "可在电脑端选项处，点击“修复WiFi名称是乱码”。<a href=\"" + link_wifiCodes + "\" target=\"_blank\">参考解决方法</a>"
					},
			  {
					"Ask": "其他问题与解决方法",
					"Answer": "<a href=\"" + link_wifiOther + "\" target=\"_blank\">参照这里</a>"
					}
			]  //第六个title对应的内容结束
		]
  }; //end FAQ_wifi


	//左侧导航一级按钮的收放：
	$.fn.slideBtn = function(){
		var me = $(this); //me是一级按钮
		var mySubList = me.parent().find("ul"); //按钮下的二级菜单
		var open = "faq_navBtn_open", closed = "faq_navBtn_closed";
		me.click(function(){
		  if( !!me.hasClass( open ) ){ //如果是开启状态
			  me.removeClass("faq_navBtn_open");
			  me.addClass("faq_navBtn_closed");
			  mySubList.hide(300);
		  }else{
			  me.removeClass("faq_navBtn_closed");
			  me.addClass("faq_navBtn_open");
			  mySubList.show(300);
			}
		});
	};
	var navBtns = $(".faq_navBtn");
	for(var i = 0; i < navBtns.length; i++){
		$(navBtns[i]).slideBtn();
	}

	//页面加载，渲染相关内容：
	function renderNav(data, highLight){ //参数highLight表示是否需要有初始高亮的
		var tkn = data.token; //标识类型是r1d还是随身wifi
		var titles = data.titles;
		var titlesContainer = $("#Nav" + tkn + "_ul"); //导航容器
		for(var i = 0; i < titles.length; i++){ //遍历导航标题
			var _item = '<li class="flis faq_lis' + tkn + '" data="conBox' + tkn + '_' + i +'">' + titles[i] + '</li>';
			titlesContainer.append( _item );
			if( i == 0 && highLight ){
				$(titlesContainer.find("li")[i]).addClass("active");
			}
		}; //end for
		$(".faq_lis" + tkn).click(function(){
			var me = $(this);
			var _id = me.attr("data");
			$(".flis").removeClass("active");
			me.addClass("active");
			$(".faq_contents").hide();
			$(".faq_conbox").hide();
			$("#Con" + tkn).show();
			$("#" + _id).show();
		})
	};

	function renderContents( data, highLight ){
		var tkn = data.token;
		var conTitle = data.conTitle;
		var cons = data.contents;
		var conContainer = $("#Con" + tkn); //内容的大容器
		if( highLight ){ conContainer.show(); }
		conContainer.find("h3").html( conTitle );
		for( var i = 0; i < cons.length; i++ ){
			var _tmpl = '<div class="faq_conbox" id="conBox' + tkn + '_' + i + '"></div>';
			conContainer.append( _tmpl );
			var thisCon = cons[i]; //某一个导航标题下对应的内容集合
			for( var j = 0; j < thisCon.length; j++ ){
				var _singleTmpl = '<div class="faq_item"><h4>' + thisCon[j].Ask + '</h4><div>' + thisCon[j].Answer + '</div></div>';
				$("#conBox" + tkn + "_" + i).append( _singleTmpl );
			}
			if( i == 0 && highLight ){
				$("#conBox" + tkn + "_" + i).show();
			}
		}; //end for
		renderNav( data, highLight );
	};

	renderContents( FAQ_r1d, true ); //页面加载默认展示的内容传true
	renderContents( FAQ_wifi, false );
	

})();

/*! grunt_one 2014-01-09 */
/**
 * @fileOverview 自定义滚动条
 * @author <a href="mailto:haley.wang.vip@gmail.com">Harley Wang</a>
 */


/**
 * 自定义滚动条
 * @class 自定义滚动条
 * @param  {Object} options 滚动条的配置选项
 * @param  {Element} options.scrollBox  滚动条的容器
 * @example 示例如下：
 *     var scrollBar = new ScrollBar();
 */
var ScrollBar = function(){
	this.construct.apply(this, arguments);
};
ScrollBar.prototype = {
	/**
	 * 初始化方法
	 * @constructor
	 * @private
	 */
	construct: function(options){
		this.scrollBox = options.scrollBox || null;
		this.scrollBar = options.scrollBar || null;
		this.contentBox = options.contentBox || null;

		this.autoBarSize = options.autoBarSize || true;
		this.VM = options.verticalMargin || 0;

		// 重新内部变量
		this.reset();
			// 绑定事件
		this.addScrollListener(this.contentBox, dom.bind(this.onWheelHandle, this));
		this.scrollBar.onmousedown = dom.bind(this.onDragStart, this);
	},
	/**
	 * 重置滚动条的位置
	 * @function
	 * @return {Boolean} 是否成功重置
	 */
	reset: function(){
		this.isShowBar = true;
		if(this.contentBox.scrollHeight <= Math.min(this.scrollBox.scrollHeight, this.scrollBox.offsetHeight)){
			this.isShowBar = false;
			return false;
		}

		this.scrollBar.style.display = 'block';

		// 鼠标偏移量
		this.offset = 0;

		this.pos = positionedOffset(this.scrollBox);

		// 动态设置滚动条的高度
		if(this.autoBarSize){
			var barHeight = parseInt(this.scrollBox.offsetHeight/(this.contentBox.scrollHeight/this.contentBox.offsetHeight));
			this.scrollBar.style.height = barHeight + 'px';
		}

		// 滚动条可用高度
		this.scrollHeight = this.scrollBox.offsetHeight - this.scrollBar.offsetHeight-2 - this.VM*2;
		// 内容可用高度
		this.contentHeight = this.contentBox.scrollHeight - this.contentBox.offsetHeight-2;
			
		// 设置滚动条的位置
		this.setPosition(this.contentBox.scrollTop);

		return true;
	},
	/**
	 * 添加滚动监听
	 * @param {Element} element     需要监听的对象
	 * @param {Function} wheelHandle  所绑定的方法
	 * @private
	 */
	addScrollListener: function(element, wheelHandle){
		var ua = navigator.userAgent.toLowerCase();
		if(element.attachEvent){
			element.attachEvent('onmousewheel', wheelHandle);
		}else if(ua.indexOf("firefox") > -1){
			element.addEventListener('DOMMouseScroll', wheelHandle, false);
		}else{
			element.addEventListener('mousewheel', wheelHandle, false);
		}
	},
	/**
	 * 滚轮事件
	 * @event
	 * @param  {Event} e 事件对象
	 */
	onWheelHandle: function(e){
		var e = e || window.event;
		var delta = e.wheelDelta ? (e.wheelDelta / 120) : (- e.detail / 3);
		if(delta && this.isShowBar){
			this.contentBox.scrollTop -= delta * 20;
			this.setPosition(this.contentBox.scrollTop);
		}
	},
	/**
	 * 设置滚动条的位置
	 * @function
	 * @param {Number} topnum 距离容器顶端的像素数
	 */
	setPosition: function(topnum){
		this.scrollBar.style.top = parseInt(this.scrollHeight/this.contentHeight*topnum) + this.VM + 'px';
	},
	/**
	 * 拖动开始事件
	 * @event
	 * @param {Event} e 事件对象
	 */
	onDragStart: function(){
		var event = arguments[0] || window.event;
		var obj = event.target || event.srcElement;
		
		this.offset = event.clientY - this.pos.y - obj.offsetTop;
		try{
			window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
		}catch(e){}
		
		document.onmousemove = dom.bind(this.onDraging, this);
		document.onmouseup = dom.bind(this.onDragEnd, this);
	},
	/**
	 * 拖动中事件
	 * @event
	 * @param {Event} e 事件对象
	 */
	onDraging: function(){
		var event = arguments[0] || window.event;
		var obj = event.target || event.srcElement;
		try{
			window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
		}catch(e){}

		var moveTop = event.clientY - this.pos.y - this.offset;
		
		moveTop = moveTop<0?0:moveTop;
		moveTop = moveTop>this.scrollHeight?this.scrollHeight:moveTop;

		this.scrollBar.style.top =  moveTop + this.VM + 'px';
		this.scrollBar.style.cursor = 'default';
		this.contentBox.scrollTop = parseInt(moveTop/(this.scrollHeight/this.contentHeight));
	},
	/**
	 * 拖动结束事件
	 * @event
	 */
	onDragEnd: function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
};

/**
 * @fileOverview 本地存储功能类
 * @author <a href="mailto:haley.wang.vip@gmail.com">Harley Wang</a>
 * @version 1.0.0
 */


/**
 * 本地存储功能类，完美兼容IE67891011、Firefox、Chrome、Opera、Safari浏览器
 * @name UserData
 * @class 本地存储功能
 * @property {String} name 当前域名
 * @property {Object} userData 用于存储对象的句柄
 * @property {Boolean} isLocalStorage 当前浏览器是否支持LocalStorage功能
 * @example 示例如下：
 *     UserData.setItem("name", "HarleyWang");
 *     UserData.getItem("name");
 *     UserData.removeItem("name");
 * @see  <a href="http://www.qq.com" target="_break">UserData在线Demo</a>
 */
var UserData = {
	userData: null,
	name: location.hostname,
	isLocalStorage: typeof localStorage == 'undefined'?false:true,
	/**
	 * 初始化方法
	 * @private
	 */
	init: function(){
		if (!this.userData) {
			try {
				this.userData = document.createElement('INPUT');
				this.userData.type = "hidden";
				this.userData.style.display = "none";
				this.userData.addBehavior ("#default#userData");
				document.body.appendChild(this.userData);
				var expires = new Date();
				expires.setDate(expires.getDate()+365);
				this.userData.expires = expires.toUTCString();
			} catch(e) {
				return false;
			}
		}
		return true;
	},
	/**
	 * 设置存储项
	 * @param {String} key   用来索引存储项的Key
	 * @param {String} value 所存储的值
	 */
	setItem: function(key, value) {
		if(this.isLocalStorage){
			localStorage.setItem(key, value);
		}
		else if(this.init()){
			this.userData.load(this.name);
			this.userData.setAttribute(key, value);
			this.userData.save(this.name);
		}
	},
	/**
	 * 根据Key获取存储项
	 * @param  {String} key  存储时所设置的Key
	 * @return {String}      返回该Key所对应的存储值
	 */
	getItem: function(key) {
		if(this.isLocalStorage){
			return localStorage.getItem(key);
		}
		else if(this.init()){
			this.userData.load(this.name);
			return this.userData.getAttribute(key)
		}
		return null;
	},
	/**
	 * 移除本地存储Key对应的值
	 * @param  {String} key  需要移除的Key
	 */
	removeItem: function(key) {
		if(this.isLocalStorage){
			localStorage.removeItem(key);
		}
		else if(this.init()){
			this.userData.load(this.name);
			this.userData.removeAttribute(key);
			this.userData.save(this.name);
		}
	}
};
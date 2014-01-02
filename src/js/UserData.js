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
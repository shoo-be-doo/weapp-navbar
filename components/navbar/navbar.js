// 系统信息
const systemInfo = wx.getSystemInfoSync();
// 胶囊按钮信息
const menuButtonRect = wx.getMenuButtonBoundingClientRect();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  	// 背景
	  background: {
	  	type: String,
		  value: '#FFF'
	  },

	  // 字体颜色
	  textColor: {
		  type: String,
		  value: '#000'
	  },

	  // 标题
	  title: {
		  type: String,
		  value: ''
	  },

	  // 主页路径
	  homeUrl: {
		  type: Boolean,
		  value: '/pages/index/index'
	  }
  },

  /**
   * 组件的初始数据
   */
  data: {
	  _navbarStyle: '',
	  _backStyle: '',
	  _titleStyle: '',
	  _capsuleStyle: '',
	  _capsuleItemStyle: '',
	  _capsuleLineStyle: '',
	  _titleTextColor: 'white',
	  _backVisible: false,
	  _homeVisible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
	  // 初始化自定义导航栏样式
	  initNavbarLayout() {
		  const { top, right, width, height } = menuButtonRect;
		  const { statusBarHeight, windowWidth, fontSizeSetting } = systemInfo;
		  // 自定义导航栏高度
		  const navbarHeight = top - statusBarHeight + height + top;
		  // 内边距
		  let paddingBottom = top - statusBarHeight;
		  let paddingTop = statusBarHeight + paddingBottom;
		  let paddingLeft = windowWidth - right;
		  let paddingRight = paddingLeft * 2 + width;
		  // 导航栏基础样式
		  let _navbarStyle = `
				padding-top: ${ paddingTop }px;
				padding-right: ${ paddingRight }px;
				padding-bottom: ${ paddingBottom }px;
				padding-left: ${ paddingLeft }px;
				height: ${ navbarHeight }px;
				font-size: ${ fontSizeSetting }px;
				background: ${ this.properties.background };
			`;

		  // 标题样式
		  let _titleStyle = `
		    width: calc(100vw - ${ paddingRight * 2 }px);
		    line-height: ${ height }px;
		    color: ${ this.data._titleTextColor };
		  `;

		  // 返回按钮样式
		  let _backStyle = `
		    border-top: ${ this.data._titleTextColor } solid 2px;
        border-left: ${ this.data._titleTextColor } solid 2px;
		  `;

		  // 胶囊样式
		  let _capsuleStyle = `
		    border-radius: ${ height }px;
		    margin-right: ${ paddingLeft }px;
		  `;
		  if (this.data._backVisible || this.data._homeVisible) {
			  _capsuleStyle += `
				  background: ${ this.data._titleTextColor === 'black' ? '#FFFFFF90' : '#00000028' };
			    border: ${ this.data._titleTextColor === 'black' ? '#00000015' : '#FFFFFF40' } solid 0.5px;
			  `;
		  }

		  // 胶囊按钮样式
		  let _capsuleItemStyle = `
		    width: ${ width / 2 }px;
		  `;

		  // 胶囊线条样式
		  let _capsuleLineStyle = `
		    border-left: ${ this.data._titleTextColor === 'black' ? '#00000015' : '#FFFFFF40' } solid 0.5px;
		  `;

		  this.setData({
			  _navbarStyle,
			  _backStyle,
			  _titleStyle,
			  _capsuleStyle,
			  _capsuleItemStyle,
			  _capsuleLineStyle,
		  });
	  },

	  /**
	   * 初始化数据
	   */
	  initData() {
		  const pages = getCurrentPages();
		  const config = {
		  	...__wxConfig.global.window,
			  ...__wxAppCode__[`${pages[pages.length - 1].route}.json`]
		  };
		  // 场景值
		  const { scene } = wx.getLaunchOptionsSync();
		  this.setData({
			  _titleTextColor: config.navigationBarTextStyle || 'white',
			  _backVisible: pages.length > 1,
			  _homeVisible: pages.length > 1 || [1007, 1008, 1014].indexOf(scene) > -1,
		  });
	  },

	  // 点击后退按钮
	  handleTapBack() {
	  	wx.navigateBack({
			  delta: 1,
		  });
	  },

	  // 点击主页按钮
	  handleTapHome() {
	  	wx.reLaunch({
			  url: this.data.homeUrl,
		  });
	  }
  },

	/**
	 * 组件生命周期函数-在组件实例进入页面节点树时执行
	 */
	attached() {
		this.initData();
		this.initNavbarLayout();
	}
});

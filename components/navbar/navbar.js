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
		  value: '标题看似到啦;翻开冬季分开三三代范老三但凡;老撒懂'
	  }
  },

  /**
   * 组件的初始数据
   */
  data: {
	  navbarStyle: '',
	  backStyle: '',
	  titleStyle: '',
	  titleTextColor: 'white',
	  backVisible: false,
	  homeVisible: false,
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
		  let navbarStyle = `
				padding-top: ${ paddingTop }px;
				padding-right: ${ paddingRight }px;
				padding-bottom: ${ paddingBottom }px;
				padding-left: ${ paddingLeft }px;
				height: ${ navbarHeight }px;
				font-size: ${ fontSizeSetting }px;
				background: ${ this.properties.background };
			`;
		  // 返回按钮样式
		  let backStyle = `
		    border-top: ${ this.data.titleTextColor } solid 2px ;
        border-left: ${ this.data.titleTextColor } solid 2px ;
		  `;
		  let titleStyle = `
		    width: calc(100vw - ${ paddingRight * 2 }px);
		    line-height: ${ height }px;
		  `;
		  this.setData({
			  navbarStyle,
			  backStyle,
			  titleStyle
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
		  this.setData({
			  titleTextColor: config.navigationBarTextStyle || 'white',
			  backVisible: pages.length > 1,
			  homeVisible: pages.length > 1,
		  });
	  },

	  // 点击后退按钮
	  handleTapBack() {
	  	wx.navigateBack({
			  delta: 1,
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

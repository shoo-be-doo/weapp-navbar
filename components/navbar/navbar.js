// 系统信息
const systemInfo = wx.getSystemInfoSync();
// 胶囊按钮信息
const menuButtonRect = wx.getMenuButtonBoundingClientRect();
console.log(menuButtonRect)
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

	  search: {
		  type: Boolean,
		  value: true
	  }
  },

  /**
   * 组件的初始数据
   */
  data: {
	  _navbarStyle: '',
	  _backStyle: '',
	  _titleStyle: '',
	  _searchStyle: '',
	  _capsuleStyle: '',
	  _capsuleItemStyle: '',
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
		  `;

		  // 返回按钮样式
		  let _backStyle = `
		    border-top: ${ this.data.titleTextColor } solid 2px ;
        border-left: ${ this.data.titleTextColor } solid 2px ;
		  `;

		  // 搜索样式
		  let _searchStyle = `
		    border-radius: ${ height }px;
		  `;

		  // 胶囊样式
		  let _capsuleStyle = `
		    border-radius: ${ height }px;
		    margin-right: ${ paddingLeft }px;
		    background: ${ this.data.titleTextColor === 'black' ? '#FFFFFF90' : '#00000028' };
		    border: ${ this.data.titleTextColor === 'black' ? '#00000015' : '#FFFFFF40' } solid 0.5px;
		  `;

		  // 胶囊按钮样式
		  let _capsuleItemStyle = `
		    width: ${ width / 2 }px;
		  `;

		  this.setData({
			  _navbarStyle,
			  _backStyle,
			  _titleStyle,
			  _capsuleStyle,
			  _capsuleItemStyle,
			  _searchStyle,
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

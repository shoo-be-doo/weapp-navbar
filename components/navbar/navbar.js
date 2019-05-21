// components/navbar/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
	  navbarHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
  	// 计算自定义导航栏高度
		getNavbarHeight() {
			// 系统信息
			const systemInfo = wx.getSystemInfoSync();
			// 胶囊按钮信息
			const menuButtonRect = wx.getMenuButtonBoundingClientRect();
			// 状态栏高度
			const { statusBarHeight } = systemInfo;
			// 自定义导航栏高度
			const navbarHeight = (menuButtonRect.top - statusBarHeight) * 2 + menuButtonRect.height + menuButtonRect.top;
			this.setData({
				navbarHeight
			});
		}
  },

	/**
	 * 组件生命周期函数-在组件实例进入页面节点树时执行
	 */
	attached() {
		this.getNavbarHeight();
	}
});

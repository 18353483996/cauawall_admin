//app.js
App({

  globalData: {
    userInfo: null,
    rpx_height: 0
  },
  onLaunch: function() {

    //初始化知晓云服务器
    wx.BaaS = requirePlugin('sdkPlugin');
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment);
    let clientID = 'ff5bac1f10f1a6165529';
    wx.BaaS.init(clientID);

    // 微信用户登录小程序
    wx.BaaS.login(false).then(res => {
      console.log("登陆成功!!!");
      console.log(res);
      // 登录成功
    }, err => {
      // 登录失败
    });

    //获取手机设备信息
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.rpx_height = 750 * res.windowHeight / res.windowWidth;
      },
    })
  }
})
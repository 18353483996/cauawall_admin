//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    index_height: 0,
    userInfo: {},
    hasUserInfo: false
  },

  onLoad: function() {
    this.setData({
      index_height: app.globalData.rpx_height
    });

    //读缓存是否有用户信息
    if (wx.getStorageSync('userInfo')) {
      var userInfo = wx.getStorageSync('userInfo');
      console.log("读取用户信息缓存成功!!!");
      console.log(userInfo);
      app.globalData.userInfo = userInfo;
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
  },

  //用户第一次登陆授权获取信息，并存入缓存
  getUserInfo: function(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
      console.log("授权成功!!!");
      console.log(res);
      wx.setStorageSync('userInfo', res);
      this.setData({
        userInfo: res,
        hasUserInfo: true
      });
    }, res => {
      //失败调用的方法
    });

  }
})
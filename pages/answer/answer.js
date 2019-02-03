const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    color_head: "#1296db",
    color_xiaoxi: "#2c2c2c",
    color_star: "#2c2c2c",
    color_self: "#2c2c2c",
    img_self: "/img/self.png",
    img_head: "/img/head_s.png",
    img_xiaxi: "/img/xiaoxi.png",
    img_star: "/img/star.png",
    answer_height: 500,
    currentTab: 0,
    currentTab_detial: 0,
    contentList: [],
    navbarlist: ['全部', '校园卡', '竞赛项目', '学校食堂', '通知公告', '其他'],
    detial_all: [],
    detial_card: [],
    detial_contest: [],
    detial_messhall: [],
    detial_notification: [],
    detial_others: [],
    detial_list: ['全部', '校园卡', '竞赛项目', '学校食堂', '通知公告', '其他'],
  },

  head: function() {
    this.setData({
      color_self: "#2c2c2c",
      color_head: "#1296db",
      color_xiaoxi: "#2c2c2c",
      color_star: "#2c2c2c",
      img_self: "/img/self.png",
      img_head: "/img/head_s.png",
      img_xiaxi: "/img/xiaoxi.png",
      img_star: "/img/star.png",
      currentTab: 0,
    })
  },

  xiaoxi: function() {
    this.setData({
      color_self: "#2c2c2c",
      color_head: "#2c2c2c",
      color_xiaoxi: "#1296db",
      color_star: "#2c2c2c",
      img_self: "/img/self.png",
      img_head: "/img/head.png",
      img_xiaxi: "/img/xiaoxi_s.png",
      img_star: "/img/star.png",
      currentTab: 1,
    })
  },

  star: function() {
    this.setData({
      color_self: "#2c2c2c",
      color_head: "#2c2c2c",
      color_xiaoxi: "#2c2c2c",
      color_star: "#1296db",
      img_self: "/img/self.png",
      img_head: "/img/head.png",
      img_xiaxi: "/img/xiaoxi.png",
      img_star: "/img/star_s.png",
      currentTab: 2,
    })
  },

  self: function() {
    this.setData({
      color_self: "#1296db",
      color_head: "#2c2c2c",
      color_xiaoxi: "#2c2c2c",
      color_star: "#2c2c2c",
      img_self: "/img/self_sel.png",
      img_head: "/img/head.png",
      img_xiaxi: "/img/xiaoxi.png",
      img_star: "/img/star.png",
      currentTab: 3,
    })
  },

  nav_change: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  detial_change: function(e) {
    this.setData({
      currentTab_detial: e.detail.current
    });
  },

  navbarBindtap: function(e) {
    this.setData({
      currentTab_detial: e.currentTarget.id
    });
  },

  stopTouchMove: function() {
    return false;
  },

  onTouch_all: function(e) {
    wx.navigateTo({
      url: "../block_detial/block_detial?category=" + e.currentTarget.dataset.category + "&content=" + e.currentTarget.dataset.content + "&created_at=" + e.currentTarget.dataset.created_at + "&title=" + e.currentTarget.dataset.title + "&username=" + e.currentTarget.dataset.username + "&userurl=" + e.currentTarget.dataset.userurl
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      answer_height: app.globalData.rpx_height
    });
    //调用查询函数获取所有问题
    this.question_query(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * scroll-view下拉刷新函数
   */
  refresh: function() {
    //调用查询函数获取所有问题
    this.question_query(this);
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)

  },
  
  /**
   * 自定义查询函数
   */
  question_query: function(that) {

    //查询表中信息
    let tableName = "Questions";
    //设置查询条件
    let query_card = new wx.BaaS.Query();
    query_card.compare('category', '=', '校园卡');
    let query_contest = new wx.BaaS.Query();
    query_contest.compare('category', '=', '竞赛项目');
    let query_messhall = new wx.BaaS.Query();
    query_messhall.compare('category', '=', '学校食堂');
    let query_notification = new wx.BaaS.Query();
    query_notification.compare('category', '=', '通知公告');
    let query_others = new wx.BaaS.Query();
    query_others.compare('category', '=', '其他');
    // 查询所有信息
    let Questions = new wx.BaaS.TableObject(tableName);

    Questions.limit(100).offset(0).orderBy('-created_at').find().then(res => {
      // success
      that.setData({
        detial_all: res.data.objects
      });
      for (var i = 0; i < this.data.detial_all.length; i++) {
        var time = new Date(parseInt(that.data.detial_all[i].created_at) * 1000)
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        this.data.detial_all[i].created_at = m + "-" + d + " " + h + ":" + mm;
      }
      this.setData({
        detial_all: this.data.detial_all
      });
    });

    //查询校园卡信息
    Questions.setQuery(query_card).limit(100).offset(0).orderBy('-created_at').find().then(res => {
      // success
      that.setData({
        detial_card: res.data.objects
      });
      for (var i = 0; i < this.data.detial_card.length; i++) {
        var time = new Date(parseInt(that.data.detial_card[i].created_at) * 1000)
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        this.data.detial_card[i].created_at = m + "-" + d + " " + h + ":" + mm;
      }
      this.setData({
        detial_card: this.data.detial_card
      });
    });
    //查询竞赛项目信息
    Questions.setQuery(query_contest).limit(100).offset(0).orderBy('-created_at').find().then(res => {
      // success
      that.setData({
        detial_contest: res.data.objects
      });
      for (var i = 0; i < this.data.detial_contest.length; i++) {
        var time = new Date(parseInt(that.data.detial_contest[i].created_at) * 1000)
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        this.data.detial_contest[i].created_at = m + "-" + d + " " + h + ":" + mm;
      }
      this.setData({
        detial_contest: this.data.detial_contest
      });
    });
    //查询学校食堂信息
    Questions.setQuery(query_messhall).limit(100).offset(0).orderBy('-created_at').find().then(res => {
      // success
      that.setData({
        detial_messhall: res.data.objects
      });
      for (var i = 0; i < this.data.detial_messhall.length; i++) {
        var time = new Date(parseInt(that.data.detial_messhall[i].created_at) * 1000)
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        this.data.detial_messhall[i].created_at = m + "-" + d + " " + h + ":" + mm;
      }
      this.setData({
        detial_messhall: this.data.detial_messhall
      });
    });
    //查询通知公告信息
    Questions.setQuery(query_notification).limit(100).offset(0).orderBy('-created_at').find().then(res => {
      // success
      that.setData({
        detial_notification: res.data.objects
      });
      for (var i = 0; i < this.data.detial_notification.length; i++) {
        var time = new Date(parseInt(that.data.detial_notification[i].created_at) * 1000)
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        this.data.detial_notification[i].created_at = m + "-" + d + " " + h + ":" + mm;
      }
      this.setData({
        detial_notification: this.data.detial_notification
      });
    });
    //查询其他信息
    Questions.setQuery(query_others).limit(100).offset(0).orderBy('-created_at').find().then(res => {
      // success
      that.setData({
        detial_others: res.data.objects
      });
      for (var i = 0; i < this.data.detial_others.length; i++) {
        var time = new Date(parseInt(that.data.detial_others[i].created_at) * 1000)
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        this.data.detial_others[i].created_at = m + "-" + d + " " + h + ":" + mm;
      }
      this.setData({
        detial_others: this.data.detial_others
      });
    });
  }
})
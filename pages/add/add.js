const app = getApp()
var questionInfo = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [' ', '校园卡', '竞赛项目', '学校食堂', '通知公告', '其他'],
    index: 0,
    answer_height: 500,
    currentTab: 0,
    contentList: []
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      add_height: app.globalData.rpx_height
    });
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
   * 提交表单数据
   */
  formSubmit: function(e) {
    questionInfo = {
      title: e.detail.value.title,
      content: e.detail.value.content
    }
    let tableName = "Questions";
    let Question = new wx.BaaS.TableObject(tableName);
    let question = Question.create();

    question.set("questionInfo", questionInfo);
    question.set("category", this.data.categoryList[e.detail.value.index]);
    question.set("review", false);
    question.set("username", app.globalData.userInfo.nickName);
    question.set("userurl", app.globalData.userInfo.avatarUrl);
    question.save().then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });
    }, err => {
      wx.showToast({
        title: '提交失败',
        icon: 'fail',
        duration: 2000
      });
    })
  }
})
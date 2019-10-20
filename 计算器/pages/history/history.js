// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   calcHis:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  // 得到 内存计算记录 并 赋值给calcHis
  onLoad: function (options) {
    let that = this ;
  wx.getStorage({
    key: 'calcHistory',
    success: function(res) {
      console.log(res) ;
      that.setData({
        calcHis:res.data
      })
    },
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
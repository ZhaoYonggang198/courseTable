var getCourses = require('../../model/course.js').getCourses
var getOpenId = require('../../model/openid.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfo:[]
  
  },

  //事件处理函数
  editCourse: function () {
    wx.navigateTo({
      url: '/pages/config/config'
    })
  },

  bindPhone: function () {
      wx.navigateTo({
          url: '/pages/bind-phone/bind-phone'
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      
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
      getOpenId().then((openid) => {
          getCourses(openid).then((courses) => {
              console.log(courses)
              app.globalData.courseInfo = courses
              this.setData({
                  courseInfo: courses
              })
          })
      }
      )  
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
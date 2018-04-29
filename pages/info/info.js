// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfo:
      [
        {
          name: "星期一",
          interval: [
            {
              name: "上午",
              course: [
                "语文",
                "数学"
              ]
            },
            {
              name: "下午",
              course: [
                "体育",
                "画画"
              ]
            }
          ]
        },
        {
          name: "星期二",
          interval: [
            {
              name: "上午",
              course: [
                "语文",
                "数学"
              ]
            },
            {
              name: "下午",
              course: [
                "体育",
                "画画"
              ]
            }
          ]
        },
        {
          name: "星期三",
          interval: [
            {
              name: "上午",
              course: [
                "语文",
                "数学"
              ]
            },
            {
              name: "下午",
              course: [
                "体育",
                "画画"
              ]
            }
          ]
        },
        {
          name: "星期四",
          interval: [
            {
              name: "上午",
              course: [
                "语文",
                "数学"
              ]
            },
            {
              name: "下午",
              course: [
                "体育",
                "画画"
              ]
            }
          ]
        },
        {
          name: "星期五",
          interval: [
            {
              name: "上午",
              course: [
                "语文",
                "数学"
              ]
            },
            {
              name: "下午",
              course: [
                "体育",
                "画画"
              ]
            }
          ]
        },
        {
          name: "周末",
          interval: [
            {
              name: "上午",
              course: [
                "休息"
              ]
            },
            {
              name: "下午",
              course: [
                "休息"
              ]
            }
          ]
        }
      ]
  
  },

  //事件处理函数
  editCourse: function () {
    wx.navigateTo({
      url: '/pages/config/config'
    })
  },

  //事件处理函数
  clearCourse: function () {
    console.log("clearCourse")
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
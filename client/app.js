// pages/info/info.js
var wxopenid = require('./model/openid.js');

var util = require('./utils/util.js')



App({
    onLaunch: function () {
        this.updateGlobalData()
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        courseInfo: []
    },

    updateGlobalData: function () {
        var that = this
        wxopenid().then(function(openid){
            util.showSuccess("登录成功")
            that.hasLogin = true
            console.log(openid)
        })
    }
});
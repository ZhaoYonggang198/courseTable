var openId = null

var service = require("../config.js").service

var requestWXOpenid = function () {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (loginResult) {
                wx.request({
                    url: `${service.openIdUrl}?code=${loginResult.code}`,
                    success: function (res) {
                        if (res.data) {
                            openId = res.data.openid
                            resolve(openId)
                        }
                        else
                            reject(res)
                    },
                    fail: function (err) {
                        reject(err)
                    }
                })
            },
            fail: function (error) {
                reject(error)
            }
        })
    })
}

var getOpenId = function () {
    if (openId === null) {
        return requestWXOpenid()
    } else {
        return Promise.resolve(openId)
    }
}

module.exports = getOpenId
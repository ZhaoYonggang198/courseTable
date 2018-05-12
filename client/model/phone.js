const url = require("../config.js").service.phoneUrl

var getPhone = function (openid) {
    return new Promise(function(resolve, reject){
        wx.request({
            url: url,
            data: {
                openid: openid
            },
            success: (response) => {
                resolve(response)
            },
            faile: (err) => {
                reject(err)
            }
        })
    })
}

var bindPhone = function (openid, phone) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            method: 'POST',
            data: {
                openid: openid,
                phone: phone
            },
            success: (response) => {
                resolve(response)
            },
            faile: (err) => {
                reject(err)
            }
        })
    })
}

module.exports = { getPhone, bindPhone}
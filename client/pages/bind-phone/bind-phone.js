var Phone = require('../../model/phone.js')
var getOpenId = require('../../model/openid.js')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        bindstatus: "尚未绑定手机",
        bindoper: '绑定手机',
        bindedphone: '',
        curphone: ''
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getOpenId().then((openid) => {
            Phone.getPhone(openid).then((res) => {
                if (res.statusCode === 200) {
                    this.updatePhone("15026583818")
                }
            })
        })
    },

    updatePhone: function (phone) {
        if(phone !== ''){
            this.setData({
                bindstatus: `已绑定手机${phone}`,
                bindoper: '重新绑定手机',
                bindedphone: phone
            })
        } else {
            this.setData({
                bindstatus: "尚未绑定手机",
                bindoper: '绑定手机',
                bindedphone: '',               
            })
        }
    },

    _bindPhone: function ( phone ) {
        wx.showLoading({
            title: '正在绑定',
            mask: true
        })
        getOpenId().then((openid) => {
            Phone.bindPhone(openid, phone).then((res) => {
                if (res.statusCode === 200) {
                    wx.showToast({
                        title: '操作成功',
                        icon: 'success'
                    })
                    this.updatePhone(phone)
                } else {
                    wx.showToast({
                        title: '操作失败',
                        icon: 'fail'
                    })                    
                }
            })
        })        
    },

    bindPhone: function (e) {
        this._bindPhone(this.data.curphone)
    },
    
    unbindPhone: function (e) {
        this._bindPhone('')
    },

    phoneInput: function (e) {
        this.setData({
            curphone: e.detail.value
        })
    }
})
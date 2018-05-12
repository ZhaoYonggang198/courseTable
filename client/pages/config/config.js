// pages/config/config.js；
var saveCourses = require('../../model/course.js').saveCourses
var getOpenId = require('../../model/openid.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseInfo: [],
        readyToDel: {
            day: -1,
            interval: -1,
            course: -1
        },

        modalStatus: {
            show: false,
            label: "",
            course: "",
            pickerList: {
                value: [-1, -1, -1],
                days: [],
                intervals: [],
                courses: []
            }
        }
    },

    getPickerList: function (curDay, curInterval, curCourse) {
        var pickerList = {
            value: [curDay, curInterval, -1],
            days: [],
            intervals: [],
            courses: [""]
        }

        for (let dayIdx in this.data.courseInfo) {
            let day = this.data.courseInfo[dayIdx]
            pickerList.days.push(day.name)
            for (let intervalIdx in day.interval) {
                let interval = day.interval[intervalIdx]
                if (pickerList.intervals.indexOf(interval.name) == -1) {
                    pickerList.intervals.push(interval.name)
                }

                for (let courseIdx in interval.course) {
                    let course = interval.course[courseIdx]
                    if (pickerList.courses.indexOf(course) == -1) {
                        pickerList.courses.push(course);
                    }
                }
            }
        }

        pickerList.courses.sort(function (lhs, rhs) { return lhs > rhs })

        for (let courseIdx in pickerList.courses) {
            let course = pickerList.courses[courseIdx]

            let foundIdx = course.indexOf(curCourse)
            if (foundIdx == 0) {
                pickerList.value[2] = courseIdx
                break
            }
        }

        return pickerList

    },

    pickerChange(e) {
        const val = e.detail.value

        var modalStatus = this.data.modalStatus
        const pickerList = modalStatus.pickerList
        modalStatus.label = pickerList.days[val[0]] + " " + pickerList.intervals[val[1]]
        modalStatus.course = pickerList.courses[val[2]]
        modalStatus.pickerList.value = val

        this.setData({
            modalStatus: modalStatus

        })
    },

    courseInput(e) {
        const val = e.detail.value
        const regex = /^(\w|[\u4E00-\u9FA5])*$/
        var modalStatus = this.data.modalStatus
        modalStatus.course = val
        modalStatus.error = !regex.test(val)
        this.setData({
            modalStatus: modalStatus
        })

    },

    dayToggle(e) {
        var courseInfo = this.data.courseInfo
        if (e.target.id == "add") {

            this.setData({
                modalStatus: {
                    show: true,
                    label: courseInfo[e.currentTarget.id].name + " 上午",
                    course: "",
                    pickerList: this.getPickerList(e.currentTarget.id, 0, "")
                }
            })
        } else {

            courseInfo[e.currentTarget.id].open = !courseInfo[e.currentTarget.id].open
            this.setData(
                {
                    courseInfo: courseInfo
                }
            )
        }

    },

    /**
   * 弹出框蒙层截断touchmove事件
   */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
        this.setData({
            modalStatus: {
                show: false
            }
        })
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function () {
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
        const modalStatus = this.data.modalStatus
        if (!modalStatus.error){
            console.log(this.data.modalStatus)
            const dayIdx = modalStatus.pickerList.value[0]
            const intervalIdx = modalStatus.pickerList.value[1]
            const course = modalStatus.course
            this.data.courseInfo[dayIdx].interval[intervalIdx].course.push(course)
            this.setData({
                courseInfo: this.data.courseInfo
            })
            wx.showToast({
                icon: 'success',
                title: `课程已添加`,
            })
        } else {

        }   
    },

    configCourse(e) {
        var dataset = e.currentTarget.dataset
        let day = dataset.day
        let interval = dataset.interval
        let course = dataset.course

        if (e.target.id === "delete") {
            this.data.courseInfo[day].interval[interval].course.splice(course, 1);
            this.setData({
                courseInfo: this.data.courseInfo
            }
            )
        }
        else {
            let current = this.data.readyToDel

            if (day == current.day
                && interval == current.interval
                && course == current.course) {
                this.setData({
                    readyToDel: {
                        day: -1,
                        interval: -1,
                        course: -1
                    }
                })
            }
            else {
                this.setData({
                    readyToDel: {
                        day: day,
                        interval: interval,
                        course: course
                    }
                })
            }

        }
    },

    recover: function (e) {
        this.setData({
            courseInfo: getApp().globalData.courseInfo
        })
    },

    clear: function (e) {
        var courseInfo = this.data.courseInfo
        for(var day of courseInfo){
            for(var interval of day.interval){
                interval.course = []
            }
        }
        this.setData({
            courseInfo: courseInfo
        })
    },

    save: function (e) {
        wx.showLoading({
            title: '正在保存',
            mask: true
        })
        getOpenId()
            .then( (openid) => {
                saveCourses(openid, this.data.courseInfo)
                    .then( function(result) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success'
                        })
                    })
            })

    },

    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({

            courseInfo: getApp().globalData.courseInfo
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
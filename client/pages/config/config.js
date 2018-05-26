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
            dayIndex: -1,
            dayName: "",
            intervals: {
                index: -1,
                list: []
            },
            course: "",
            courses: {
                index: -1,
                list: []
            }
        }
    },

    updateModalStatus: function(curDay, interval) {
        const courseInfo = this.data.courseInfo
        this.setData({
            modalStatus: {
                show: true,
                dayIndex: curDay,
                dayName: courseInfo[curDay].name,
                intervals: this.getIntervalList(curDay, interval),
                course: "",
                courses: this.getCourseList()
            }
        })
    },

    getIntervalList: function(curDay, interval) {
        var intervals = {
            index: interval,
            list: []
        }

        let day = this.data.courseInfo[curDay]
        for (let intervalIdx in day.interval) {
            let interval = day.interval[intervalIdx]

            intervals.list.push(interval.name)
        }
        

        return intervals
    },

    getCourseList: function () {
        var pickerList = {
            index: 0,
            list: ["手工输入课程"]
        }

        for (let dayIdx in this.data.courseInfo) {
            let day = this.data.courseInfo[dayIdx]
            for (let intervalIdx in day.interval) {
                let interval = day.interval[intervalIdx]

                for (let courseIdx in interval.course) {
                    let course = interval.course[courseIdx]
                    if (pickerList.list.indexOf(course) == -1) {
                        pickerList.list.push(course);
                    }
                }
            }
        }
        return pickerList
    },

    intervalChange(e){
        this.data.modalStatus.intervals.index = e.detail.value
        this.setData({
            modalStatus: this.data.modalStatus

        })        
    },

    pickerChange(e) {
        const val = e.detail.value

        var modalStatus = this.data.modalStatus

        modalStatus.courses.index = val
        if(val != 0) {
            modalStatus.course = modalStatus.courses.list[val]
        }

        this.setData({
            modalStatus: modalStatus

        })
    },

    courseInput(e) {
        const val = e.detail.value
        const regex = /^(\w|[\u4E00-\u9FA5])|.|&*$/
        var modalStatus = this.data.modalStatus
        modalStatus.course = val
        modalStatus.error = !regex.test(val)
        this.setData({
            modalStatus: modalStatus
        })

    },

    dataEdit(e) {
        
        var curDay = e.currentTarget.id
        if (e.target.id == "add") {
            this.updateModalStatus(curDay, 0)
        } else {
            var courseInfo = this.data.courseInfo
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
    showSomeDayCourse: function(day) {
        var courseInfo = this.data.courseInfo
        for(var idx in courseInfo) {
            courseInfo[idx].open = false
        }
        courseInfo[day].open = true
        this.setData(
            {
                courseInfo: courseInfo
            }
        )
    },

    onCancel: function () {
        this.showSomeDayCourse(this.data.modalStatus.dayIndex)
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
        const modalStatus = this.data.modalStatus
        if (!modalStatus.error){
            console.log(this.data.modalStatus)
            const dayIdx = modalStatus.dayIndex
            const intervalIdx = modalStatus.intervals.index
            const course = modalStatus.course
            this.data.courseInfo[dayIdx].interval[intervalIdx].course.push(course)
            this.setData({
                courseInfo: this.data.courseInfo
            })
            this.updateModalStatus(dayIdx, intervalIdx)
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
            this.deleteCourse(day, interval, course)
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

    deleteCourse: function(day, interval, course){
        this.data.courseInfo[day].interval[interval].course.splice(course, 1);
        this.setData({
            courseInfo: this.data.courseInfo
        }
        )
    },

    deleteCurdayCourse: function(ev) {
        var dataset = ev.currentTarget.dataset
        let day = dataset.day
        let interval = dataset.interval
        let course = dataset.course
        this.deleteCourse(day, interval, course)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({

            courseInfo: getApp().globalData.courseInfo
        })

        if(options.day !== undefined)
        {
            this.updateModalStatus(options.day, 0)
        }
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
const url = require("../config.js").service.courseUrl

var weekdays = [
    { 
        backend: "monday",
        frontend: "星期一"
    },
    {
        backend: "tuesday",
        frontend: "星期二"
    },
    {
        backend: "wednesday",
        frontend: "星期三"
    },
    {
        backend: "thursday",
        frontend: "星期四"
    },
    {
        backend: "friday",
        frontend: "星期五"
    }, 
    {
        backend: "saturday",
        frontend: "星期六"
    },
    {
        backend: "sunday",
        frontend: "星期日"
    }
]

var intervals = [
    {
        backend: "morning",
        frontend: "上午"
    },
    {
        backend: "afternoon",
        frontend: "下午"
    },
    {
        backend: "evening",
        frontend: "晚上"
    }
]

var getFrontEndCourse = function (backendCourse) {
    let frontend = []
    for(let day of weekdays){
        let daycourse = {}
        daycourse.name = day.frontend
        daycourse.interval = []
        for(let interval of intervals) {
            let intervalCourse = {}
            intervalCourse.name = interval.frontend
            intervalCourse.course = backendCourse[day.backend]?
                    (backendCourse[day.backend][interval.backend]||[]) : []
            daycourse.interval.push(intervalCourse)
        }
        frontend.push(daycourse)
    }
    return frontend
}

var getBackEndCourse = function (frontEnd) {
    let backend = {}
    for (let dayIdx in weekdays) {
        backend[weekdays[dayIdx].backend] = {}  
        for (let intervalIdx in intervals) {
            backend[weekdays[dayIdx].backend]
                [intervals[intervalIdx].backend] = 
            frontEnd[dayIdx].interval[intervalIdx].course
        }
    }
    return backend
}

var getCourses = function (openId) {

    return new  Promise(function (resolve, reject) {
        wx.request({
            url: `${url}?openid=${openId}`,
            success: function(response) {
                var backendCourse = {}
                console.log(response)

                if(response.statusCode == 200) {
                    backendCourse = response.data.courseTable
                }
                
                resolve(getFrontEndCourse(backendCourse))
            },
            fail: function(err) {
                reject(err)
            }
        })
    })

}

var saveCourses = function (openid, courses){
    var backendCourses = getBackEndCourse(courses)
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: 'POST',
            data: {
                openid: openid,
                courseTable: backendCourses
            },
            success: function(response) {
                resolve(response)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}

module.exports = {getCourses, saveCourses}
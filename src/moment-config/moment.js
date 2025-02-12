const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Bangkok');

function FomatMoment(timeString) {
    if (!(timeString)) {
        // เวลาในรูปแบบ ISO UTC
        return moment().utc().tz('Asia/Bangkok');
    } else if (typeof timeString == 'object') {
        return moment(timeString).utc().tz('Asia/Bangkok');
    } else if (timeString.endsWith('Z')) {
        return moment(timeString).utc().tz('Asia/Bangkok');
    } else {
        // เวลาที่ไม่ระบุโซนเวลา ถือว่าเป็นเวลาในประเทศไทย
        return moment(timeString, "YYYY-MM-DD HH:mm:ss", 'Asia/Bangkok');
    }
}

// console.log(FomatMoment('2023-11-14 09:19:10'))

module.exports = FomatMoment;
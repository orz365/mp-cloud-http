/**
 * 提供适用于腾讯云开发中提供的日期字符串的工具
 */
class DateUtil {

    static pad(num){
        return num < 10?'0'+num : num
    }

    static format(date){
        let year = date.getFullYear(),
            month = this.pad(date.getMonth() + 1),
            day = this.pad(date.getDate())
        return `${year}${month}${day}`
    }

    static getYesterday(){
        let date = new Date()
        date.setDate(date.getDate() - 1)
        return this.format(date)
    }

}


module.exports = DateUtil
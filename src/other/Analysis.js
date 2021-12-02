const logger = require('../utils/logger')
const {getToken} = require('../utils/token')
const api = require('../utils/api')
const Base = require('../common/Base')

const HttpService = require('../utils/HttpService')

class Analysis extends Base{

    /**
     * 获取用户访问小程序数据概况
     * @param begin_date 开始日期 yyyymmdd
     * @param end_date 结束日期 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getDailySummary({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getDailySummary(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取用户访问小程序日留存
     * @param begin_date 开始日期 yyyymmdd
     * @param end_date 结束日期 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getDailyRetain({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getDailyRetain(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取用户访问小程序月留存
     * @param begin_date 开始日期 yyyymmdd
     * @param end_date 结束日期 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getMonthlyRetain({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getMonthlyRetain(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取用户访问小程序周留存
     * @param begin_date 开始日期 yyyymmdd
     * @param end_date 结束日期 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getWeeklyRetain({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }
        

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getWeeklyRetain(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }


    /**
     * 获取用户访问小程序数据日趋势
     * @param begin_date [yyyymmdd] 开始日期
     * @param end_date [yyyymmdd] 结束日期，限定查询1天数据
     * @return {Promise<unknown>}
     */
    async getDailyVisitTrend({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }
        

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getDailyVisitTrend(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取用户访问小程序数据月趋势(能查询到的最新数据为上一个自然月的数据)
     * @param begin_date 开始日期，为自然月第一天。格式为 yyyymmdd
     * @param end_date 结束日期，为自然月最后一天，限定查询一个月的数据。格式为 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getMonthlyVisitTrend({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }
        

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getMonthlyVisitTrend(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取用户访问小程序数据月趋势(能查询到的最新数据为上一个自然月的数据)
     * @param begin_date 开始日期，为自然月第一天。格式为 yyyymmdd
     * @param end_date 结束日期，为自然月最后一天，限定查询一个月的数据。格式为 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getWeeklyVisitTrend({begin_date, end_date = begin_date}) {
        let access_token = await getToken(this.params)

        let data = {
            begin_date,
            end_date
        }
        

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getWeeklyVisitTrend(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取小程序启动性能，运行性能等数据。
     * @param time
     * @param module
     * @param params
     * @return {Promise<unknown>}
     */
    async getPerformanceData(data) {
        let access_token = await getToken(this.params)

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getPerformanceData(access_token)
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取小程序新增或活跃用户的画像分布数据。时间范围支持昨天、最近7天、最近30天。
     * 其中，新增用户数为时间范围内首次访问小程序的去重用户数，活跃用户数为时间范围内访问过小程序的去重用户数。
     * @param begin_date
     * @param end_date
     * @return {Promise<unknown>}
     */
    async getUserPortrait({begin_date,end_date = begin_date}) {
        let access_token = await getToken(this.params)
        let data = {
            begin_date,
            end_date
        }
        let promise = new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/datacube/getweanalysisappiduserportrait?access_token=${access_token}`
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 获取用户小程序访问分布数据
     * @param begin_date 开始日期。格式为 yyyymmdd
     * @param end_date 结束日期，限定查询 1 天数据，允许设置的最大值为昨日。格式为 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getVisitDistribution({begin_date,end_date = begin_date}) {
        let access_token = await getToken(this.params)
        let data = {
            begin_date,
            end_date
        }
        let promise = new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/datacube/getweanalysisappidvisitdistribution?access_token=${access_token}`
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }

    /**
     * 访问页面。目前只提供按 page_visit_pv 排序的 top200。
     * @param begin_date
     * @param end_date 结束日期，限定查询1天数据，允许设置的最大值为昨日。格式为 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getVisitPage({begin_date,end_date = begin_date}) {
        let access_token = await getToken(this.params)
        let data = {
            begin_date,
            end_date
        }
        let promise = new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/datacube/getweanalysisappidvisitpage?access_token=${access_token}`
            HttpService.post(url,data).then(res => {
                if(res.errcode){
                    reject(res)
                }else{
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise;
    }
}

module.exports = Analysis
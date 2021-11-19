const logger = require('../utils/logger')
const axios = require('axios')
const {getToken} = require('../utils/token')
const api = require('../utils/api')

class Analysis {

    constructor({env, appid, appsecret, access_token, debug}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
        logger.level = debug ? 'debug' : 'error'
    }

    /**
     * 获取用户访问小程序数据概况
     * @param begin_date 开始日期 yyyymmdd
     * @param end_date 结束日期 yyyymmdd
     * @return {Promise<unknown>}
     */
    async getDailySummary(begin_date, end_date = begin_date) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            begin_date,
            end_date
        }

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getDailySummary(access_token)
            axios.post(url,data).then(res => {
                logger.debug(res.data)
                resolve(res)
            }).catch(err => {
                logger.error(err)
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
    async getDailyRetain(begin_date, end_date = begin_date) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            begin_date,
            end_date
        }

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getDailyRetain(access_token)
            axios.post(url,data).then(res => {
                logger.debug(res.data)
                resolve(res)
            }).catch(err => {
                logger.error(err)
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
    async getMonthlyRetain(begin_date, end_date = begin_date) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            begin_date,
            end_date
        }
        console.log(begin_date,end_date)

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getMonthlyRetain(access_token)
            axios.post(url,data).then(res => {
                logger.debug(res.data)
                resolve(res)
            }).catch(err => {
                logger.error(err)
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
    async getWeeklyRetain(begin_date, end_date = begin_date) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            begin_date,
            end_date
        }
        console.log(begin_date,end_date)

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getWeeklyRetain(access_token)
            axios.post(url,data).then(res => {
                logger.debug(res.data)
                resolve(res)
            }).catch(err => {
                logger.error(err)
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
    async getDailyVisitTrend(begin_date, end_date = begin_date) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            begin_date,
            end_date
        }
        console.log(begin_date,end_date)

        let promise = new Promise((resolve, reject) => {
            let url = api.analysis.getDailyVisitTrend(access_token)
            axios.post(url,data).then(res => {
                logger.debug(res.data)
                resolve(res)
            }).catch(err => {
                logger.error(err)
                reject(err)
            })
        })
        return promise;
    }


}

module.exports = Analysis
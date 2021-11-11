const logger = require('../utils/logger')
const axios = require('axios')
const {getToken} = require('../utils/token')
const querystring = require('querystring')
const FormData = require('form-data')

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
            access_token,
            begin_date,
            end_date
        }

        let promise = new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=${access_token}`,data).then(res => {
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
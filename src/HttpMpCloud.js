const Collection = require('./Collection')
const Storage = require('./other/Storage')
const Collections = require('./Collections')
const logger = require('./utils/logger')
const {getToken, deleteToken, clearToken} = require('./utils/token')
const HttpService = require('./utils/HttpService')
const Img = require('./other/Img')
const Wxacode = require('./other/Wxacode')
const CustomerServiceMessage = require('./other/CustomerServiceMessage')
const Analysis = require('./other/Analysis')
const Security = require('./other/Security')
const CommonBase = require('./common/Base')

/**
 * 微信小程序云开发HTTP请求类
 */
class HttpMpCloud extends CommonBase {

    /**
     * 获取当前
     */
    currentToken() {
        return getToken(this.env, this.appid, this.appsecret)
    }

    /**
     * 数据库选择
     * @param env
     * @return {HttpMpCloud}
     */
    database(env) {
        if (env) {
            this.env = env
        }
        return this
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    collection(tableName) {
        this.params['tableName'] = tableName
        return new Collection(this.params)
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    collections() {
        return new Collections(this.params)
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    storage() {
        return new Storage(this.params)
    }

    /**
     * 触发云函数
     * HTTP API 途径触发云函数不包含用户信息
     * @param name
     * @param data
     * @return {Promise}
     */
    async callFunction({name, data}) {

        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&name=${name}&env=${this.env}`
        return new Promise((resolve, reject) => {
            HttpService.post(url, data).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                } else {
                    try {
                        resolve(JSON.parse(res.resp_data))
                    } catch (e) {
                        logger.error(e)
                    }
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    img() {
        return new Img(this.params)
    }

    wxacode() {
        return new Wxacode(this.params)
    }

    customerServiceMessage() {
        return new CustomerServiceMessage(this.params)
    }

    analysis() {
        return new Analysis(this.params)
    }

    security() {
        return new Security(this.params)
    }

}

module.exports = HttpMpCloud
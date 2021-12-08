const Collection = require('./Collection')
const Storage = require('./other/Storage')
const Collections = require('./Collections')
const logger = require('./utils/logger')
const {getToken, getNewToken} = require('./utils/token')
const HttpService = require('./utils/HttpService')
const Img = require('./other/Img')
const Wxacode = require('./other/Wxacode')
const CustomerServiceMessage = require('./other/CustomerServiceMessage')
const Analysis = require('./other/Analysis')
const Security = require('./other/Security')
const Base = require('./common/Base')
const Database = require('./Database')

/**
 * 微信小程序云开发HTTP请求类
 */
class HttpMpCloud extends Base {

    /**
     * 获取当前
     * @deprecated
     */
    currentToken() {
        return getToken(this.params)
    }

    /**
     * 获取最新的token，并返回{access_token,expires_in}
     * 如果不想使用当前的缓存来管理access_token，可以拿到最新的token后自行管理
     * @return {Promise<{access_token,expires_in}>}
     */
    async getNewToken() {
        let {access_token,expires_in} = await getNewToken(this.params)
        return {access_token,expires_in}
    }

    /**
     * 自己管理access_token，重新设置access_token
     * @param access_token
     */
    setAccessToken(access_token){
        this.params.access_token = access_token
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
        return new Database(this.params)
    }

    /**
     * 操作集合 使用 hcloud.database().collection
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

        let access_token = await getToken(this.params)

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
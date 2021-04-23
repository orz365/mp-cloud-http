const Collection = require('./Collection')
const Storage = require('./other/Storage')
const Collections = require('./Collections')
const logger = require('./utils/logger')
const {getToken, deleteToken, clearToken} = require('./utils/token')
const axios = require('axios')
const Img = require('./other/Img')
const Wxacode = require('./other/Wxacode')
const CustomerServiceMessage = require('./other/CustomerServiceMessage')

/**
 * 微信小程序云开发HTTP请求类
 */
class HttpMpCloud {

    /**
     * 构建函数
     * @param env
     * @param appid
     * @param appsecret
     * @param access_token
     * @param debug
     */
    constructor({env, appid, appsecret, access_token, debug = false}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
        this.debug = debug
        logger.level = debug ? 'debug' : 'error'
    }

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
        return new Collection({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
            tableName: tableName,
        })
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    collections() {
        return new Collections({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
        })
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    storage() {
        return new Storage({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
        })
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

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&name=${name}&env=${this.env}`, data).
            then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    try {
                        resolve(JSON.parse(data.resp_data))
                    } catch (e) {
                        logger.error(e)
                    }
                }
            }).
            catch(err => {
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
        return new Img({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
            debug: this.debug,
        })
    }

    wxacode() {
        return new Wxacode({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
            debug: this.debug,
        })
    }

    customerServiceMessage() {
        return new CustomerServiceMessage({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
            debug: this.debug,
        })
    }
}

module.exports = HttpMpCloud
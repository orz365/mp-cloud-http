const Collection = require('./Collection')
const logger = require('./utils/logger')
const {getToken} = require('./utils/token')
const axios = require('axios')

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
        logger.level = debug ? 'debug' : 'error'
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
            tableName: tableName
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

        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&name=${name}&env=${this.env}`, data).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = HttpMpCloud
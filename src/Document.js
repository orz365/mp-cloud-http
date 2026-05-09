const logger = require('./utils/logger')
const HttpService = require('./utils/HttpService')
const {getToken} = require('./utils/token')
const Operation = require('./common/Operation')

/**
 * 微信小程序集合操作类
 */
class Document  extends Operation {

    /**
     * 构造函数
     * @param env  环境id
     * @param appid   appid
     * @param appsecret  appsecret
     * @param access_token  access_token
     * @param tableName  表名
     */
    constructor(props) {
        super(props)
        console.log('baseConfig',super.baseConfig.env)
        this.tableName = props['tableName']
        this.query = props['query']
    }


    /**
     * 查询记录
     * @param options
     * @return {Promise.<void>}
     */
    async get(options = {}) {
        this.query += `.get()`

        logger.debug(this.query)
        let param = {
            "env": this.env,
            "query": this.query,
        }
        this.initQeury()

        let access_token = await getToken(this.params)

        return new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/tcb/databasequery?access_token=${access_token}`
            HttpService.post(url, param).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                } else {
                    try {
                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i] = JSON.parse(res.data[i])
                        }
                        resolve(res)
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
     * 删除记录
     * @return {Promise}
     */
    async remove() {
        this.query += `.remove()`

        logger.debug(this.query)

        let param = {
            "env": this.env,
            "query": this.query,
        }
        this.initQeury()
        let access_token = await getToken(this.params)

        return new Promise((resolve, reject) => {
            HttpService.post(`https://api.weixin.qq.com/tcb/databasedelete?access_token=${access_token}`, param, {}).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 更新记录
     * @param option
     * @return {Promise}
     */
    async update(option) {
        if (typeof (option.data) === 'undefined')
            throw new Error('更新数据格式错误')

        option = JSON.stringify(option)
        this.query += `.update(${option})`

        logger.debug(this.query)

        let param = {
            "env": this.env,
            "query": this.query,
        }
        this.initQeury()
        let access_token = await getToken(this.params)

        return new Promise((resolve, reject) => {
            HttpService.post(`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${access_token}`, param).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            }).catch(err => {
                logger.error(err)
                reject(err)
            })
        })
    }

    async set(option) {
        if (typeof (option.data) === 'undefined')
            throw new Error('更新数据格式错误')

        option = JSON.stringify(option)
        this.query += `.set(${option})`

        logger.debug(this.query)

        let param = {
            "env": this.env,
            "query": this.query,
        }
        this.initQeury()
        let access_token = await getToken(this.params)

        return new Promise((resolve, reject) => {
            HttpService.post(`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${access_token}`, param).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            }).catch(err => {
                logger.error(err)
                reject(err)
            })
        })
    }

}

module.exports = Document

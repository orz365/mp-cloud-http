const logger = require('./utils/logger')
const axios = require('axios')
const {getToken} = require('./utils/token')
const querystring = require('querystring')

/**
 * 微信小程序集合操作类
 */
class Collection {

    /**
     * 构造函数
     * @param env  环境id
     * @param appid   appid
     * @param appsecret  appsecret
     * @param access_token  access_token
     * @param tableName  表名
     */
    constructor({env, appid, appsecret, access_token, tableName}) {
        this.env = env
        this.tableName = tableName
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token

        this.initQeury()
    }

    initQeury(){
        this.query = `db.collection("${this.tableName}")`
    }

    where(where) {
        if (typeof(where) === 'object') {
            where = JSON.stringify(where)
            this.query += `.where(${where})`
        }
        logger.debug(this.query)
        return this
    }

    limit(num) {
        num = parseInt(num)
        if (isNaN(num)) {
            throw new Error('limit方法参数无效')
        }
        this.query += `.limit(${num})`
        logger.debug(this.query)
        return this
    }

    skip(num) {
        num = parseInt(num)
        if (isNaN(num)) {
            throw new Error('skip方法参数无效')
        }
        this.query += `.skip(${num})`
        logger.debug(this.query)
        return this
    }

    field(option) {
        if (typeof(option) === 'object') {
            option = JSON.stringify(option)
            this.query += `.field(${option})`
        }
        logger.debug(this.query)
        return this
    }

    orderBy(field, orderType) {
        this.query += `.orderBy("${field}","${orderType}")`
        return this
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
            "query": this.query
        }
        this.initQeury()
        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databasequery?access_token=${access_token}`, param).then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    try {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i] = JSON.parse(data.data[i])
                        }
                        resolve(data)
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
     * 统计记录数量
     * @return {Promise}
     */
    async count() {
        this.query += `.count()`

        let param = {
            "env": this.env,
            "query": this.query
        }
        this.initQeury()
        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databasecount?access_token=${access_token}`, param).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 新增记录
     * @param option
     * @return {Promise}
     */
    async add(option = {}) {
        if (typeof(option.data) === 'undefined')
            throw new Error('新增数据格式错误')

        option = JSON.stringify(option)
        this.query += `.add(${option})`

        logger.debug(this.query)

        let param = {
            "env": this.env,
            "query": this.query
        }
        this.initQeury()
        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databaseadd?access_token=${access_token}`, param).then(res => {
                resolve(res.data)
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
            "query": this.query
        }
        this.initQeury()
        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databasedelete?access_token=${access_token}`, param, {}).then(res => {
                resolve(res.data)
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
        if (typeof(option.data) === 'undefined')
            throw new Error('更新数据格式错误')

        option = JSON.stringify(option)
        this.query += `.update(${option})`

        logger.debug(this.query)

        let param = {
            "env": this.env,
            "query": this.query
        }
        this.initQeury()
        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${access_token}`, param).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

}

module.exports = Collection
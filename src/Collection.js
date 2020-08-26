const logger = require('./utils/logger')
const axios = require('axios')
const {getToken} = require('./utils/token')

class Collection {
    constructor({env, appid, appsecret, access_token, tableName}) {
        this.env = env
        this.tableName = tableName
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
    }

    async get(options = {}) {
        let query = `db.collection("${this.tableName}")`
        if (options.where) {
            let where = '{}'
            if (typeof(options.where) === 'string') {
                where = options.where
            } else {
                where = JSON.stringify(options.where)
            }
            query += `.where(${where})`
        }
        if (options.limit) {
            query += `.limit(${options.limit})`
        }
        if (options.skip) {
            query += `.skip(${options.skip})`
        }
        if (options.field) {
            let field = JSON.stringify(options.field)
            query += `.field(${field})`
        }
        if (options.orderBy) {
            let orders = options.orderBy.split(',')
            query += `.orderBy("${orders[0]}","${orders[1]}")`
        }
        query += `.get()`
        let param = {
            "env": this.env,
            "query": query
        }

        let access_token = await getToken(this.appid, this.appsecret, this.access_token)

        let res = await axios.post(`https://api.weixin.qq.com/tcb/databasequery?access_token=${access_token}`, param)
        let data = res.data;

        if (data.errcode) {
            logger.error(data)
        } else {
            try {
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i] = JSON.parse(data.data[i])
                }
            } catch (e) {
                logger.error(e)
            }
        }

        return data
    }
}

module.exports = Collection
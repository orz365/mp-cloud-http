const logger = require('./utils/logger')
const axios = require('axios')
const {getToken} = require('./utils/token')
const querystring = require('querystring')
const Common = require('./Common')

class Aggregate extends Common {

    /**
     * 构建函数
     * @param env 环境id
     * @param appid  appid
     * @param appsecret appsecret
     * @param access_token access_token
     * @param tableName 表名
     * @param query 查询sql字符串
     */
    constructor({env, appid, appsecret, access_token, tableName, query}) {
        super()
        this.env = env
        this.tableName = tableName
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token

        this.query = `${query}.aggregate()`
    }

    /**
     * 聚合阶段。添加新字段到输出的记录。
     * @param object
     * @return {Aggregate}
     */
    addFields(object) {
        object = JSON.stringify(object)
        this.query += `.addFields(${object})`
        return this
    }

    /**
     * 聚合阶段。联表查询。
     * @param object
     * @return {Aggregate}
     */
    lookup(object) {
        object = JSON.stringify(object)
        this.query += `.lookup(${object})`
        return this
    }

    /**
     * 分组
     * @param object
     * @return {Aggregate}
     */
    group(object) {
        if (typeof(object) === 'object') {
            object = JSON.stringify(object)
            this.query += `.group(${object})`
        }
        logger.debug(this.query)
        return this
    }

    /**
     * 聚合阶段。计算上一聚合阶段输入到本阶段的记录数，输出一个记录，其中指定字段的值为记录数。
     * @param countName
     * @return {Aggregate}
     */
    count(countName) {
        this.query += `.count("${countName}")`
        return this
    }


    /**
     * 排序
     * @param object
     * @return {Aggregate}
     */
    sort(object) {
        object = JSON.stringify(object)
        this.query += `.sort(${object})`
        return this
    }

    /**
     * 根据数量排序
     * @param object
     * @return {Aggregate}
     */
    sortByCount(object) {
        object = JSON.stringify(object)
        this.query += `.sortByCount(${object})`
        return this
    }

    /**
     * 标志聚合操作定义完成，发起实际聚合操作
     * @return {Promise}
     */
    async end() {
        this.query += `.end()`

        logger.debug(this.query)

        let param = {
            "env": this.env,
            "query": this.query
        }
        this.initQeury()

        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/databaseaggregate?access_token=${access_token}`, param).then(res => {
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
}

module.exports = Aggregate
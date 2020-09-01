const {getToken, deleteToken, clearToken} = require('./utils/token')
const logger = require('./utils/logger')

/**
 * 数据查询与聚合通用方法
 */
class Common {
    initQeury() {
        this.query = `db.collection("${this.tableName}")`
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
}

module.exports = Common
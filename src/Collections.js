const {getToken} = require('./utils/token')
const logger = require('./utils/logger')
const Base = require('./common/Base')
const HttpService = require('./utils/HttpService')

/**
 * 微信小程序集合信息、导入导出等操作
 */
class Collections extends Base{

    constructor(props) {
        super(props);
    }

    /**
     * 获取集合信息
     * @return {Promise}
     */
    async get(data = {}) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        data.env = this.env

        return new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/tcb/databasecollectionget?access_token=${access_token}`
            HttpService.post(url, data).then(res => {
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
     * 数据库迁移状态查询
     * @param job_id 迁移任务ID
     * @return {Promise}
     */
    async migrateInfo(job_id) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            job_id
        }

        return new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${access_token}`
            HttpService.post(url, data).then(res => {
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
}

module.exports = Collections
const {getToken} = require('../utils/token')
const HttpService = require('../utils/HttpService')
const logger = require('../utils/logger')

const Base = require('../common/Base')

const xml2json = require('xml2json')

/**
 * 微信小程序集合信息、导入导出等操作
 */
class Storage extends Base {

    constructor(props) {
        super(props);
    }

    /**
     * 获取上传url链接，用户获取到返回数据后，需拼装一个 HTTP POST 请求 进行上传
     * @return {Promise}
     */
    async getUploadPath(path) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            path,
        }

        let url = `https://api.weixin.qq.com/tcb/uploadfile?access_token=${access_token}`
        return new Promise((resolve, reject) => {
            HttpService.post(url, data).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 上传文件
     * @param url
     * @param data
     * @return {Promise}
     */
    async uploadFile(url, param) {
        return HttpService.submit(url, param).then(res => {
            let result
            if (res === '') {
                result = {
                    errcode: 0,
                }
                return result
            } else {
                let jsonStr = null
                try {
                    jsonStr = xml2json.toJson(res)
                } catch (e) {

                }
                let errmsg = '未知错误'
                if (jsonStr) {
                    jsonStr = JSON.parse(jsonStr)
                    errmsg = jsonStr.Error
                }
                result = {
                    errcode: -1,
                    errmsg,
                }
                return Promise.reject(result)
            }
        })
    }

    /**
     * 根据file_id获取文件下载链接
     * @param file_list  [{fileid:'xxxx',max_age:3600}]
     * @return {Promise}
     */
    async batchDownloadFile(file_list) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            file_list,
        }

        let url = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${access_token}`

        return new Promise((resolve, reject) => {
            HttpService.post(url, data).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 根据file_id获取文件下载链接
     * @deprecated
     * @param file_list  [{fileid:'xxxx',max_age:3600}]
     * @return {Promise}
     */
    async getFileList(file_list) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            file_list,
        }
        let url = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${access_token}`

        return new Promise((resolve, reject) => {
            HttpService.post(url, data).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 根据file_id数组，批量删除存储文件
     * @param fileid_list
     */
    async batchDeleteFile(fileid_list) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            fileid_list,
        }

        let url = `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${access_token}`

        return new Promise((resolve, reject) => {
            HttpService.post(url, data).then(res => {
                if (res.errcode !== 0) {
                    reject(res)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

}

module.exports = Storage
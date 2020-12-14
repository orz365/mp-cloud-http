const {getToken} = require('../utils/token')
const axios = require('axios')
const FormData = require('form-data')

/**
 * 微信小程序集合信息、导入导出等操作
 */
class Storage {

    /**
     * 构造函数
     * @param env  环境id
     * @param appid   appid
     * @param appsecret  appsecret
     * @param access_token  access_token
     */
    constructor({env, appid, appsecret, access_token}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
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

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/uploadfile?access_token=${access_token}`, data).then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res.data)
                }
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
        let form = new FormData()
        Object.keys(param).forEach(key => {
            form.append(key, param[key])
        })

        return new Promise((resolve, reject) => {
            form.submit(url, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res)
            })
        })
    }

    /**
     * 根据file_id获取文件下载链接
     * @param file_list  [{fileid:'xxxx',max_age:3600}]
     * @return {Promise}
     */
    async getFileList(file_list) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let data = {
            env: this.env,
            file_list,
        }

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${access_token}`, data).then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res.data)
                }
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
            fileid_list
        }

        return new Promise((resolve, reject) => {
            axios.post(`https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${access_token}`, data).then(res => {
                let data = res.data
                if (data.errcode !== 0) {
                    reject(res)
                } else {
                    resolve(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

}

module.exports = Storage
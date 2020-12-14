const logger = require('../utils/logger')
const axios = require('axios')
const {getToken} = require('../utils/token')
const FormData = require('form-data')

class CustomerServiceMessage {

    constructor({env, appid, appsecret, access_token, debug}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
        logger.level = debug ? 'debug' : 'error'
    }

    /**
     * 获取客服消息内的临时素材。即下载临时的多媒体文件。目前小程序仅支持下载图片文件。
     * @param media_id 媒体文件 ID
     * @return {Promise<unknown>}
     */
    async getTempMedia(media_id) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let promise = new Promise((resolve, reject) => {
            axios.get(`https://api.weixin.qq.com/cgi-bin/media/get?access_token=${access_token}&media_id=${media_id}`, {
                responseType: 'arraybuffer',
            }).then(res => {
                logger.debug(res.data)
                resolve(res.data)
            }).catch(err => {
                logger.error(err)
                reject(err)
            })
        })
        return promise;
    }
}

module.exports = CustomerServiceMessage
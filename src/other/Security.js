/* 内容安全 */
const logger = require('../utils/logger')
const HttpService = require('../utils/HttpService')
const {getToken} = require('../utils/token')
const api = require('../utils/api')
const Base = require('../common/Base')


class Security extends Base{

    /**
     * 校验一张图片是否含有违法违规内容
     * @param media 要检测的图片文件，格式支持PNG、JPEG、JPG、GIF，图片尺寸不超过 750px x 1334px
     * @return {Promise<void>}
     */
    async imgSecCheck(media){
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let url = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${access_token}`

        HttpService.post(url,{
            media
        })
    }
}

module.exports = Security
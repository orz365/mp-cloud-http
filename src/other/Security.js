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
        let access_token = await getToken(this.params)

        let url = `https://api.weixin.qq.com/wxa/img_sec_check`

        let promise =  HttpService.submit(url,{
            access_token,
            media
        }).then(data=>{
            logger.debug('[返回的数据]', data)
            return JSON.parse(data)
        }).catch(err=>{
            return err
        })

        return promise
    }
}

module.exports = Security
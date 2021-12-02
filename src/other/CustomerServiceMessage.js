const logger = require('../utils/logger')
const {getToken} = require('../utils/token')
const Base = require('../common/Base')
const HttpService = require('../utils/HttpService')

class CustomerServiceMessage extends Base{

    constructor(props) {
        super(props);
    }

    /**
     * 获取客服消息内的临时素材。即下载临时的多媒体文件。目前小程序仅支持下载图片文件。
     * @param media_id 媒体文件 ID
     * @return {Promise<unknown>}
     */
    async getTempMedia(media_id) {
        let access_token = await getToken(this.params)

        let url  =`https://api.weixin.qq.com/cgi-bin/media/get?access_token=${access_token}&media_id=${media_id}`
        return HttpService.get(url,{
            responseType: 'arraybuffer',
        }).then(res => {
            logger.debug(res.data)
            return res.data
        }).catch(err => {
            logger.error(err)
            return err
        })

    }
}

module.exports = CustomerServiceMessage
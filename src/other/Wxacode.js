const {getToken} = require('../utils/token')

const Base = require('../common/Base')

const HttpService = require('../utils/HttpService')

class Wxacode extends Base {

    constructor(props) {
        super(props);
    }

    /**
     * 获取小程序二维码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
     * @param path 扫码进入的小程序页面路径，最大长度 128 字节，不能为空；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}。
     * @param width 二维码的宽度，单位 px。最小 280px，最大 1280px  默认430
     * @return {Promise<unknown>}
     */
    async createQRCode({path, width = 430}) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let param = {
            path: path,
            width: width,
        }

        let url = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${access_token}`

        return new Promise((resolve, reject) => {
            HttpService.post(url, param, {
                responseType: 'arraybuffer',
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
     * @param path 扫码进入的小程序页面路径，最大长度 128 字节，不能为空；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}。
     * @param width 二维码的宽度，单位 px。最小 280px，最大 1280px  默认430
     * @return {Promise<unknown>}
     */
    async get({
                  path = '',
                  width = 430,
                  auto_color = false,
                  line_color = {'r': 0, 'g': 0, 'b': 0},
                  is_hyaline = false,
              }) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let param = {
            path,
            width,
            auto_color,
            line_color,
            is_hyaline,
        }

        let url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`

        return new Promise((resolve, reject) => {
            HttpService.post(url, param, {
                responseType: 'arraybuffer',
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 获取小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
     * @param scene
     * @param page
     * @param width
     * @param auto_color
     * @param line_color
     * @param is_hyaline
     * @return {Promise<unknown>}
     */
    async getUnlimited(
        {
            scene = '',
            page = '',
            width = 430,
            auto_color = false,
            line_color = {'r': 0, 'g': 0, 'b': 0},
            is_hyaline = false,
        }) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let param = {
            scene,
            page,
            width,
            auto_color,
            line_color,
            is_hyaline,
        }

        let url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`
        return new Promise((resolve, reject) => {
            HttpService.post(url, param, {
                responseType: 'arraybuffer',
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = Wxacode
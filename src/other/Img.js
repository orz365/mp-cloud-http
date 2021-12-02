const logger = require('../utils/logger')
const {getToken} = require('../utils/token')
const api = require('../utils/api')
const HttpService = require('../utils/HttpService')

const Base = require('../common/Base')

class Img extends Base {

    constructor(props) {
        super(props);
    }

    /**
     * 本接口提供基于小程序的图片智能裁剪能力。
     * @param img 可以是图片url，也可以是图片的FormData数据
     * @return {Promise<unknown>}
     */
    async aiCrop(img) {
        let access_token = await getToken(this.params)

        let promise = null, url
        if (typeof img === 'string') {
            url = api.img.aiCrop(img, access_token)
            promise = HttpService.post(url, {
                access_token,
            }).then(res => {
                return res
            }).catch(err => {
                return err
            })
        } else {
            url = api.img.aiCrop()
            promise = HttpService.submit(url, {
                access_token,
                img,
            }).then(data => {
                logger.debug('[返回的数据]', data)
                return JSON.parse(data)
            }).catch(err => {
                return err
            })
        }
        return promise;
    }

    /**
     * 本接口提供基于小程序的条码/二维码识别的API。
     * @param img 可以是图片url，也可以是图片的FormData数据
     * @return {Promise<unknown>}
     */
    async scanQRCode(img) {
        let access_token = await getToken(this.params)
        let promise = null

        if (typeof img === 'string') {
            let url = api.img.scanQRCode(img, access_token)
            promise = HttpService.post(url, {
                access_token,
            }).then(res => {
                return res
            }).catch(err => {
                return err
            })
        } else {
            let url = api.img.scanQRCode('')
            promise = HttpService.submit(url, {
                access_token,
                img,
            }).then(data => {
                logger.debug('[返回的数据]', data)
                return JSON.parse(data)
            }).catch(err => {
                return err
            })
        }

        return promise
    }

    /**
     * 本接口提供基于小程序的图片高清化能力。
     * @param img 可以是图片url，也可以是图片的FormData数据
     * @return {Promise<unknown>}
     */
    async superresolution(img) {

        let access_token = await getToken(this.params)
        let promise = null

        if (typeof img === 'string') {
            let url = api.img.superresolution(img, access_token)
            promise = HttpService.post(url, {
                access_token,
            }).then(res => {
                return res
            }).catch(err => {
                return err
            })
        } else {
            let url = api.img.superresolution('', access_token)
            promise =  HttpService.submit(url,{
                access_token,
                img
            }).then(data=>{
                logger.debug('[返回的数据]', data)
                return JSON.parse(data)
            }).catch(err=>{
                return err
            })
        }
        return promise
    }
}

module.exports = Img
const logger = require('../utils/logger')
const axios = require('axios')
const {getToken} = require('../utils/token')
const querystring = require('querystring')
const FormData = require('form-data')
const api = require('../utils/api')

class Img {

    form = new FormData();

    constructor({env, appid, appsecret, access_token, debug}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
        logger.level = debug ? 'debug' : 'error'
    }

    /**
     * 本接口提供基于小程序的图片智能裁剪能力。
     * @param img 可以是图片url，也可以是图片的FormData数据
     * @return {Promise<unknown>}
     */
    async aiCrop(img) {
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)

        let promise = null,url
        if (typeof img === 'string') {
            promise = new Promise((resolve, reject) => {
                url = api.img.aiCrop(img,access_token)
                axios.post(url,{
                    access_token
                }).then(res => {
                    logger.debug(res)
                    resolve(res)
                }).catch(err => {
                    logger.error(err)
                    reject(err)
                })
            })
        } else {
            url = api.img.aiCrop()
            let form = new FormData()
            form.append('access_token', access_token)
            form.append('img', img)
            promise = new Promise((resolve, reject) => {
                let data = ''
                form.submit(url, (err, res) => {
                    res.on('data', (buffer) => {
                        data += buffer
                    })
                    res.on('end', () => {
                        logger.debug('[返回的数据]', data)
                        resolve(JSON.parse(data))
                    })

                })
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
        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)
        let promise = null

        if (typeof img === 'string') {
            promise = new Promise((resolve, reject) => {
                let url = api.img.scanQRCode(img,access_token)
                axios.post(url,{
                    access_token
                }).then(res => {
                    logger.debug(res.data)
                    resolve(res)
                }).catch(err => {
                    logger.error(err)
                    reject(err)
                })
            })
        } else {
            let url = api.img.scanQRCode('')
            let form = new FormData()
            form.append('access_token', access_token)
            form.append('img', img)
            promise = new Promise((resolve, reject) => {
                let data = ''
                form.submit(url, (err, res) => {
                    res.on('data', (buffer) => {
                        data += buffer
                    })
                    res.on('end', () => {
                        logger.debug('[返回的数据]', data)
                        resolve(JSON.parse(data))
                    })

                })
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

        let access_token = await getToken(this.env, this.appid, this.appsecret, this.access_token)
        let promise = null

        if (typeof img === 'string') {
            promise = new Promise((resolve, reject) => {
                let url = api.img.superresolution(img,access_token)
                axios.post(url).then(res => {
                    logger.debug('[返回的数据]', res)
                    resolve(res)
                }).catch(err => {
                    logger.error(err)
                    reject(err)
                })
            })
        } else {
            let url = api.img.superresolution('',access_token)
            let form = new FormData()
            form.append('access_token', access_token)
            form.append('img', img)
            promise = new Promise((resolve, reject) => {
                let data = ''
                form.submit(url, (err, res) => {
                    res.on('data', (buffer) => {
                        data += buffer
                    })
                    res.on('end', () => {
                        logger.debug('[返回的数据]', data)
                        resolve(JSON.parse(data))
                    })

                })
            })
        }
        return promise
    }
}

module.exports = Img
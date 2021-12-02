const logger = require('./logger')
const HttpService = require('../utils/HttpService')
const StorageUtil = require('./StorageUtil')

/**
 * 获取最新的token
 * @param env
 * @param appid
 * @param appsecret
 * @return {Promise<null|*>}
 */
const getNewToken = async function ({env, appid, appsecret}) {
    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
    let res = await HttpService.get(url, {})
    if (res.errcode) {
        logger.error('[token获取异常]', res.data)
        new Error(res)
        return null
    }
    let {access_token, expires_in} = res
    return res
}
/**
 * 获取对应环境id的token
 * @param env 环境id
 * @param appid  小程序appid
 * @param appsecret  小程序appsecret
 * @param access_token_input 传入的access_token，如果存在，则
 * @return {Promise.<*>}
 */
const getToken = async function ({env, appid, appsecret, access_token, storage_path}) {
    if (access_token) {
        logger.debug('[返回传入的access_token]')
        return access_token
    }

    let storage_key = env

    let storageUtil = StorageUtil.newInstance(storage_path)

    let token = storageUtil.getItem(storage_key)

    if (token && token.access_token && token.expire_time) {
        let expire_time = token.expire_time
        // 设置10分钟的提前量
        if (expire_time > Date.now() + 60 * 10 * 1000) {
            logger.debug('[使用缓存token]', token.access_token, token.expire_time)
            return token.access_token
        }
    } else {
        logger.debug('[缓存未匹配，重新获取token]')
    }

    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
    let res = await HttpService.get(url, {})
    if (res.errcode) {
        logger.error('[token获取异常]', res.data)
        new Error(res)
        return null
    }

    logger.debug('[重新获取access_token]')

    let expire_time = Date.now() + res.expires_in * 1000

    storageUtil.setItem(storage_key, {
        access_token: res.access_token,
        expires_in: res.expires_in,
        expire_time,
    })

    return res.access_token
}
module.exports = {
    getToken,
    getNewToken
}
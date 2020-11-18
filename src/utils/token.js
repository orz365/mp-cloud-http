var JsonStorage = require('node-localstorage').JSONStorage,
    axios = require('axios'),
    logger = require('./logger')
var storage = new JsonStorage(`${process.cwd()}/storage`)
/**
 * 获取对应环境id的token
 * @param env 环境id
 * @param appid  小程序appid
 * @param appsecret  小程序appsecret
 * @param access_token_input 传入的access_token，如果存在，则
 * @return {Promise.<*>}
 */
var getToken = async function (env, appid, appsecret, access_token_input) {
    if (access_token_input) {
        return access_token_input
    }

    let storage_key = env

    let token = storage.getItem(storage_key)
    if (token && token.access_token && token.expire_time) {
        let expire_time = token.expire_time
        // 设置10分钟的提前量
        if (expire_time > Date.now() + 60 * 10 * 1000) {
            logger.debug('[使用缓存token]',token.access_token)
            return token.access_token
        }
    } else {
        logger.debug('[缓存未匹配，重新获取token]')
    }

    let res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`, {})
    if (res.data.errcode) {
        logger.error('[token获取异常]', res.data)
        new Error(res.data)
        return null
    }
    let {access_token, expires_in} = res.data
    let expire_time = Date.now() + expires_in * 1000
    storage.setItem(storage_key, {
        access_token,
        expires_in,
        expire_time
    })
    return access_token
}

/**
 * 清空所有token
 */
var clearToken = function () {
    JsonStorage.clear()
}

/**
 * 根据环境id删除token
 * @param env
 */
var deleteToken = function (env) {
    JsonStorage.removeItem(env)
}

module.exports = {
    getToken,
    clearToken,
    deleteToken
}
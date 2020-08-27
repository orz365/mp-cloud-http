var JsonStorage = require('node-localstorage').JSONStorage,
    axios = require('axios'),
    logger = require('./logger')
var storage = new JsonStorage(`${process.cwd()}/storage`)
const storage_key = 'access_token'
var getToken = async function (appid, appsecret, access_token_input) {
    if (access_token_input) {
        return access_token_input
    }

    let token = storage.getItem(storage_key)
    if (token && token.access_token && token.expire_time) {
        let expire_time = token.expire_time
        // 设置10分钟的提前量
        if (expire_time > Date.now() + 60 * 10 * 1000) {
            logger.debug('[使用缓存token]')
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


module.exports = {
    getToken
}
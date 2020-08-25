var cache = require('memory-cache'),
    axios = require('axios'),
    logger = require('./logger')

var getToken = async function (appid, appsecret) {
    let token = cache.get('access_token')
    if (token) {
        logger.debug('[使用缓存token]')
        return token
    }

    let res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`, {})
    let {access_token, expires_in} = res.data
    cache.put('access_token', access_token, expires_in * 1000)
    return access_token
}


module.exports = {
    getToken
}
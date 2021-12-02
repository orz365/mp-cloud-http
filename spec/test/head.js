const HttpMpCloud = require('../../index')

const env = 'tenwhy-ktkq8',
    appid = 'xxx',
    appsecret = 'xxx'

const hcloud = new HttpMpCloud({
    env: env,
    appid,
    appsecret,
    debug: false,
    storage_path: __dirname,
})

const cloud = require('wx-server-sdk')

cloud.init({
    env,
})
const db = cloud.database()

module.exports = {
    hcloud,
    db,
}
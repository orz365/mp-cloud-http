const HttpMpCloud = require('../../index')

let env = 'xxx',
    appid = 'xxx',
    appsecret = 'xxx'

const hcloud = new HttpMpCloud({
    env: env,
    appid,
    appsecret,
    debug: true,
    storage_path: __dirname,
})

const db = hcloud.database()

module.exports = {
    hcloud,
    db
}
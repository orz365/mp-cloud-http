const Collection = require('./Collection')
const logger = require('./utils/logger')

class MpCloud {
    constructor({env, appid, appsecret, access_token, debug = false}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
        logger.level = debug?'debug':'error'
    }

    collection(tableName) {
        return new Collection({
            env: this.env,
            appid: this.appid,
            appsecret: this.appsecret,
            access_token: this.access_token,
            tableName: tableName
        })
    }
}

module.exports = MpCloud
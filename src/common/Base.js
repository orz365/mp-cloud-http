const logger = require('../utils/logger')

class Base {

    /**
     * 构建函数
     * @param env
     * @param appid
     * @param appsecret
     * @param access_token
     * @param debug
     */
    constructor({env, appid, appsecret, access_token, storage_path, debug = false}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
        this.access_token = access_token
        logger.level = debug ? 'debug' : 'error'

        this.params = {
            env,
            appid,
            appsecret,
            access_token,
            debug,
            storage_path: storage_path || process.cwd()
        }
    }
}

module.exports = Base
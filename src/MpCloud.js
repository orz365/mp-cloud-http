const Collection = require('./Collection')

class MpCloud {
    constructor({env, appid, appsecret}) {
        this.env = env
        this.appid = appid
        this.appsecret = appsecret
    }

    collection(tableName) {
        return new Collection(this.env, this.appid, this.appsecret, tableName)
    }
}

module.exports = MpCloud
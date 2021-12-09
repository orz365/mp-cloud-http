const Collection = require("./Collection");
const _ = require('@cloudbase/database/dist/commonjs/command').Command

const RegExp = require('@cloudbase/database/dist/commonjs/regexp/index')
const Geo = require('@cloudbase/database/dist/commonjs/geo/index')
const serverDate = require('@cloudbase/database/dist/commonjs/serverDate/index')

class Database {

    constructor(params) {
        this.params = params
        this.RegExp = RegExp.RegExpConstructor
        this.command = _
        this.Geo = Geo

        this.serverDate = serverDate
    }

    /**
     * 操作集合
     * @param tableName
     * @return {Collection}
     */
    collection(tableName) {
        this.params['tableName'] = tableName
        return new Collection(this.params)
    }
}


module.exports = Database
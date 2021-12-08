const Collection = require("./Collection");
var _ = require('@cloudbase/database/dist/commonjs/command').Command

class Database {

    constructor(params) {
        this.params = params
    }

    command = _

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
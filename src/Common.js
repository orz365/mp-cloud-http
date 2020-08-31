class Common {

    initQeury(tableName) {
        this.query = `db.collection("${this.tableName}")`
    }
}

module.exports = Common
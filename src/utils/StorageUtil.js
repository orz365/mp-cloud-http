/* 缓存工具 */
const JsonStorage = require('node-localstorage').JSONStorage
const storage = new JsonStorage(`${process.cwd()}/mch-storage`)

/**
 * 本地文件缓存
 */
class StorageUtil {
    constructor() {
    }

    static getItem(key) {
        return storage.getItem(key)
    }

    static setItem(key, value) {
        storage.setItem(key, value)
    }


    /**
     * 清空所有token
     */
    static clearToken () {
        storage.clear()
    }

    /**
     * 删除
     * @param key
     */
    static deleteToken (key) {
        storage.removeItem(key)
    }

}

module.exports = StorageUtil
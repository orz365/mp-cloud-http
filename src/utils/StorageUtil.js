/* 缓存工具 */
const JsonStorage = require('node-localstorage').JSONStorage
const path = require('path')

/**
 * 本地文件缓存
 */
class StorageUtil {

    instance = null
    storage = null

    constructor(storage_path) {
        this.storage = new JsonStorage(path.join(storage_path, 'mch-storage'))
    }

    static newInstance(storage_path) {
        if (!this.instance) {
            this.instance = new StorageUtil(storage_path)
        }
        return this.instance;
    }

    getItem(key) {
        return this.storage.getItem(key)
    }

    setItem(key, value) {
        this.storage.setItem(key, value)
    }

    /**
     * 清空所有token
     */
    clearToken() {
        this.storage.clear()
    }

    /**
     * 删除
     * @param key
     */
    deleteToken(key) {
        this.storage.removeItem(key)
    }

}

module.exports = StorageUtil
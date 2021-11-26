const logger = require('../utils/logger')
const axios = require('axios')
const FormData = require('form-data')

const submit = (url, fields = {}) => {
    let form = new FormData()
    for (let key in fields) {
        form.append(key, fields[key])
    }
    return new Promise((resolve, reject) => {
        let data = ''
        form.submit(url, (err, res) => {
            if (err) {
                reject(err)
                return;
            }
            res.on('data', (buffer) => {
                data += buffer
            })
            res.on('end', () => {
                resolve(data)
            })

        })
    })
}

const get = (url, config) => {
    return axios.get(url, config).then(res => {
        logger.debug('[返回的数据]', res.data)
        return res.data
    }).catch(err => {
        logger.error(err)
        return err
    })
}
const post = (url,data,config={})=>{
    return new Promise((resolve,reject)=>{
        axios.post(url,data,config).then(res => {
            logger.debug('[返回的数据]', res.data)
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
module.exports = {
    submit,
    get,
    post,
}
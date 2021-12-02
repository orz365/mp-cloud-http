const {hcloud} = require('./head')

const fs = require('fs')
const path = require('path')

describe("存储", function () {
    it("获取文件上传链接并上传", function (done) {
        let png = fs.createReadStream('/Users/xiangdao1/Desktop/tangshi.png')
        let path = 'demo/cssjs2.png'
        hcloud.storage().getUploadPath(path).then(res => {
            let data = {
                key: path,
                Signature: res.authorization,
                'x-cos-security-token': res.token,
                'x-cos-meta-fileid': res.cos_file_id,
                file: png,
            }
            hcloud.storage().uploadFile(res.url, data).then(res => {
                console.log('[上传成功]', res)
                done()
            }).catch(done.fail)
        }).catch(done.fail)
    });

    it("获取文件下载链接", function (done) {
        let file_list = [
            {
                "fileid":"cloud://tenwhy-ktkq8.7465-tenwhy-ktkq8-1302687829/demo/cssjs2.png",
                "max_age":7200
            }
        ]
        hcloud.storage().batchDownloadFile(file_list).then(res => {
            console.log(res)
            done()
        }).catch(err=>{
            done.fail(err)
        })
    });

    it("删除云存储文件", function (done) {
        let fileid_list = [
            'cloud://tenwhy-ktkq8.7465-tenwhy-ktkq8-1302687829/demo/cssjs2.png'
        ]
        hcloud.storage().batchDeleteFile(fileid_list).then(res => {
            console.log(res)
            done()
        }).catch(err=>{
            done.fail(err)
        })
    });

});
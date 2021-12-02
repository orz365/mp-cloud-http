const {hcloud} = require('./head')
const fs = require('fs')
const path = require('path')

describe("图像处理", function () {
    it("[img.aiCrop]小程序的图片智能裁剪", function (done) {
        var file = fs.createReadStream('/Users/xiangdao1/Desktop/双语阅读.jpg')
        hcloud.img().aiCrop(file).then(res => {
            if (res.errcode !== 0) {
                done.fail(res)
            } else {
                done()
            }
        }).catch(err => {
            console.error(err)
            done.fail(err)
        })
    });

    it("[img.scanQRCode]提供基于小程序的条码/二维码识别的API", function (done) {
        var file = fs.createReadStream('/Users/xiangdao1/Desktop/双语阅读.jpg')
        hcloud.img().scanQRCode(file).then(res => {
            if (res.errcode !== 0) {
                done.fail(res)
            } else {
                done()
            }
        }).catch(err => {
            console.error(err)
            done.fail(err)
        })
    });

    it("[img.superresolution]本接口提供基于小程序的图片高清化能力", function (done) {
        var file = fs.createReadStream('/Users/xiangdao1/Desktop/双语阅读.jpg')
        hcloud.img().superresolution(file).then(res => {
            if (res.errcode !== 0) {
                done.fail(res)
            } else {
                console.log(res)
                // 这里直接根据media_id下载图片
                let targetPath = path.join(__dirname,'media_id.jpg')
                hcloud.customerServiceMessage().getTempMedia(res.media_id).then(data => {
                    console.log(data)
                    fs.writeFileSync(targetPath, Buffer.from(data, 'binary'))
                    done()
                })
            }
        }).catch(err => {
            console.error(err)
            done.fail(err)
        })
    });

});
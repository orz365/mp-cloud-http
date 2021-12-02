const {hcloud} = require('./head')

const fs = require('fs')
const path = require('path')

describe("小程序码", function () {
    it("[wxacode.get]获取小程序码", function (done) {
        let targetPath = path.join(__dirname,'qrcode.jpg')
        hcloud.wxacode().get({
            scene: 1,
            path: '/pages/10why/index/index',
            width: 280,
        }).then(bufferStr => {
            fs.writeFileSync(targetPath, bufferStr, 'binary')
            done()
        }).catch(err => {
            console.error(err)
            done.fail(err)
        })
    });

    it("[wxacode.createQRCode]获取小程序二维码", function (done) {
        let targetPath = path.join(__dirname,'qrcode2.jpg')
        hcloud.wxacode().createQRCode({
            path: '/pages/10why/index/index',
            width: 280,
        }).then(bufferStr => {
            fs.writeFileSync(targetPath, bufferStr, 'binary')
            done()
        }).catch(err => {
            console.error(err)
            done.fail(err)
        })
    });

    it("[wxacode.getUnlimited]获取小程序二维码", function (done) {
        let targetPath = path.join(__dirname,'qrcode3.jpg')
        hcloud.wxacode().getUnlimited({
            scene: 1,
            path: '/pages/10why/index/index',
            width: 280,
        }).then(bufferStr => {
            fs.writeFileSync(targetPath, bufferStr, 'binary')
            done()
        }).catch(err => {
            console.error(err)
            done.fail(err)
        })
    });
});
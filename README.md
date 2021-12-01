# 微信小程序云服务HTTP工具

微信小程序云开发提供了 HTTP API 访问云开发资源，mp-cloud-http对http请求的api进行简单的封装，方便调用。

### 安装
使用npm

```sh
npm install mp-cloud-http
```

### 例子
```javascript
const HttpMpCloud = require('mp-cloud-http')
const cloud = require('wx-server-sdk')   // 微信开发的sdk，用于条件参数的生成

// 参数
let env = '环境id',
    appid = 'appid',
    appsecret = 'appsecret',
    access_token = 'access_token'  // 优先使用access_token
    
// 初始化云开发自己的环境
cloud.init({
    env: env
})

// 获取云开发本身的数据库，仅用于条件参数的生成，如db.command
let db = cloud.database()

// 生成Http云开发对象
let hcloud = new HttpMpCloud({
    env: env,
    appid,
    appsecret,
    access_token  // 可选
})

// 获取最新的{access_token,expires_in}，每次都获取最新的token，慎用
hcloud.getNewToken().then(console.log)
// 返回数据
{
  access_token: 'access_token',
  expires_in: 7200
}

// 如果不想使用实例中的缓存来管理access_token
// 可以自己管理的access_token信息，自己管理过期时间等
// 在实例中就会使用当前设置的token
hcloud.setAccessToken('access_token')

// 获取集合数据库表tb_test
let collection = hcloud.collection('tb_test')

// 查询记录
collection.where({
    "_id": "6518b7395f470de7006a0e971ed13105"
}).get().then(res => {
    console.log(res.data)
})

```

### 使用方法
#### 新增记录
```javascript
collection.add({
    data: {
        name: 'mp-cloud-http',
        date: new Date()
    }
}).then(console.log)
//{ errcode: 0, errmsg: 'ok', id_list: [ 'ac5f38825f471c14006c5c1a0cc8511f' ] }
```
#### 删除记录
```javascript
collection.where({
    _id: 'ac5f38825f471c14006c5c1a0cc8511f'
}).remove().then(console.log)
// { errcode: 0, errmsg: 'ok', deleted: 1 }
```

#### 更新记录
```javascript
collection.where({
    _id: '7498b5fe5f471c3f006eb57853b7dc92'
}).update({
    data: {
        date: new Date()
    }
}).then(console.log)
// { errcode: 0, errmsg: 'ok', matched: 1, modified: 1, id: '' }
```

#### 查询记录
```javascript
collection.where({
    date: db.command.lt(new Date())  // db.command的使用，初始化云开发自己的环境，参照上面的例子
}).get().then(console.log)
// { errcode: 0, errmsg: 'ok', pager: { Offset: 0, Limit: 10, Total: 2 }, data: [ '{"_id":"aa133ce55f471c0e0054fe571042cb75","date":"2020-08-27T02:35:58.268Z","name":"mp-cloud-http"}']}
```

#### 聚合函数的使用
```javascript
const HttpMpCloud = require('mp-cloud-http')
const cloud = require('wx-server-sdk')   // 微信开发的sdk，用于条件参数的生成

// 参数
let env = '环境id',
    appid = 'appid',
    appsecret = 'appsecret',
    access_token = 'access_token'  // 优先使用access_token

cloud.init({
    env
})
let db = cloud.database()
let _ = db.command
let $ = db.command.aggregate

let hcloud = new HttpMpCloud({
    env,
    appid,
    appsecret,
    debug: true
})

// 联表查询 
hcloud.collection('tb_comment').aggregate().lookup({
    from: 'tb_post',
    let: {
        post_id: '$target_id'
    },
    pipeline: $.pipeline()
        .match(
            _.expr(
                $.and([
                    $.eq(['$_id', '$$post_id'])
                ])
            )
        ).project({
            _id: 1,
            content: 1
        }).done(),
    as: 'postList'
}).limit(1).end().then(res => {
    console.log(res.data[0].postList)
}).catch(console.log)

// 随机从评论表中查询一条记录
hcloud.collection('tb_comment').aggregate().sample({
    size:1
}).end().then(console.log)
```

### 云存储的使用
#### 获取存储下载链接
```javascript
let file_list = [{
    fileid: 'fileid',
    max_age: 3600
}]
hcloud.storage().batchDownloadFile(file_list).then(console.log).catch(console.error)
```
#### 获取文件上传链接，并上传文件
````javascript
let png = fs.createReadStream('demo.png')
let path = 'demo.png'

// 获取上传链接等信息
hcloud.storage().getUploadPath(path).then(res => {
    console.log(res)
    let data = {
        key: path,
        Signature: res.authorization,
        'x-cos-security-token': res.token,
        'x-cos-meta-fileid': res.cos_file_id,
        file: png
    }
    // 根据返回的信息上传文件到云存储
    hcloud.storage().uploadFile(res.url, data).then(res => {
        // 上传成功
    }).catch(console.error)
}).catch(console.error)
````

### 小程序码
#### wxacode.createQRCode 
获取小程序二维码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
```javascript
hcloud.wxacode().createQRCode({
    path: 'page/10why/index/index',
    width: 280,
}).then(bufferStr => {
    fs.writeFileSync('./qrcode2.jpg', bufferStr, 'binary')
}).catch(err => {
    console.log(err)
})
```

#### wxacode.get
获取小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
```javascript
hcloud.wxacode().get({
    path: 'page/10why/index/index',
    width: 280,
}).then(bufferStr => {
    fs.writeFileSync('./qrcode2.jpg', bufferStr, 'binary')
}).catch(err => {
    console.log(err)
})
```

#### wxacode.getUnlimited
获取小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
```javascript
hcloud.wxacode().getUnlimited({
    scene: 1,
    path: 'page/10why/index/index',
    width: 280,
}).then(bufferStr => {
    fs.writeFileSync('./qrcode2.jpg', bufferStr, 'binary')
}).catch(err => {
    console.log(err)
})
```

### 图像处理
#### img.aiCrop
本接口提供基于小程序的图片智能裁剪能力。
```javascript
var file = fs.createReadStream('图片.png')
hcloud.img().aiCrop(file).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})
// {"errcode":0,"errmsg":"ok","results":[{"crop_left":0,"crop_top":0,"crop_right":852,"crop_bottom":864}],"img_size":{"w":856,"h":992}}
```

#### img.scanQRCode
本接口提供基于小程序的条码/二维码识别的API。
```javascript
var file = fs.createReadStream('二维码.png')
hcloud.img().scanQRCode(file).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})
// {"errcode":0,"errmsg":"ok","code_results":[{"type_name":"WX_CODE","data":"l0\/=oGy~LAW)$8mS,jAIP6"}],"img_size":{"w":856,"h":992}}
```

#### img.superresolution
本接口提供基于小程序的图片高清化能力。
```javascript
var file = fs.createReadStream('图片.png')
hcloud.img().superresolution(file).then(res => {
    // 根据返回的media_id，获取图片信息
    hcloud.customerServiceMessage().getTempMedia(res.media_id).then(data => {
        let result = fs.writeFileSync('./lll.jpg', Buffer.from(data, 'binary'))
    })
}).catch(err => {
    console.error(err)
})
```

### 小程序数据分析
#### 获取用户访问小程序数据概况
```javascript
hcloud.analysis().getDailySummary('20211109').then(res => {
    console.log(res.data)
}).catch(err => {
    console.error(err)
})
```

#### 获取用户访问小程序日留存
```javascript
hcloud.analysis().getDailyRetain('20211115').then(res => {
    console.log(res.data)
}).catch(err => {
    console.error(err)
})
```
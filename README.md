# 微信小程序云服务HTTP工具

微信小程序云开发提供了 HTTP API 访问云开发资源，http-mpcloud对http请求的api进行简单的封装，方便调用。

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
        name: 'http-mpcloud',
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
// { errcode: 0, errmsg: 'ok', pager: { Offset: 0, Limit: 10, Total: 2 }, data: [ '{"_id":"aa133ce55f471c0e0054fe571042cb75","date":"2020-08-27T02:35:58.268Z","name":"http-mpcloud"}']}
```


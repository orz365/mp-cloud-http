# 微信小程序云服务HTTP工具

微信小程序云开发提供了 HTTP API 访问云开发资源，http-mpcloud对http请求的api进行简单的封装，方便调用。

### 安装
使用npm

```sh
npm i http-mpcloud
```

```javascript
const HttpMpCloud = require('http-mpcloud')

let env = '环境id',
    appid = 'appid',
    appsecret = 'appsecret',
    access_token = 'access_token'  // 优先使用access_token

let hcloud = new HttpMpCloud({
    env: env,
    appid,
    appsecret,
    access_token  // 可选
})

let collection = hcloud.collection('tb_test')

// 查询记录
collection.where({
    "_id": "6518b7395f470de7006a0e971ed13105"
}).get().then(res => {
    console.log(res.data)
})

```

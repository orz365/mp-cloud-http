# 微信小程序云服务HTTP工具

微信小程序云开发提供了 HTTP API 访问云开发资源

### 安装
使用npm

```bash
npm i http-mpcloud
```

```javascript
const HttpMpcloud = require('http-mpcloud')
async function main() {
    var env = '环境id',
        appid = 'appid',
        appsecret = 'appsecret'
    let cloud = new HttpMpcloud({
        env: env,
        appid,
        appsecret
    })
    let collection = cloud.collection('tb_post')

    let result = await collection.get({
        where: {
            title: '为什么全球“通缉”一只小蛾'
        }
    })
    result = await collection.get({
        limit: 1
    })
    console.log(result)
}
main()
```

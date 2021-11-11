

const prefix = 'https://api.weixin.qq.com'

const api = {
    analysis:{
        getDailySummary: ()=>`${prefix}/datacube/getweanalysisappiddailysummarytrend`
    },
    img:{
        aiCrop:(img,access_token)=>`${prefix}/cv/img/aicrop?img_url=${img}&access_token=${access_token}`,
        scanQRCode: (img,access_token)=>`${prefix}/cv/img/qrcode?img_url=${img}&access_token=${access_token}`,
        superresolution: (img,access_token)=>`${prefix}/cv/img/superresolution?img_url=${img}&access_token=${access_token}`
    },

}

module.exports = api
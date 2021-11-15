const prefix = 'https://api.weixin.qq.com'

const api = {
    analysis: {
        /**
         * [POST] 获取用户访问小程序数据概况
         * @param begin_date
         * @param end_date
         * @return {string}
         */
        getDailySummary: (access_token) => `${prefix}/datacube/getweanalysisappiddailysummarytrend?access_token=${access_token}`,
        /**
         * [POST] 获取用户访问小程序日留存
         * @param begin_date
         * @param end_date
         * @return {string}
         */
        getDailyRetain: (access_token) => `${prefix}/datacube/getweanalysisappiddailyretaininfo?access_token=${access_token}`,
    },
    img: {
        aiCrop: (img, access_token) => `${prefix}/cv/img/aicrop?img_url=${img}&access_token=${access_token}`,
        scanQRCode: (img, access_token) => `${prefix}/cv/img/qrcode?img_url=${img}&access_token=${access_token}`,
        superresolution: (img, access_token) => `${prefix}/cv/img/superresolution?img_url=${img}&access_token=${access_token}`,
    },

}

module.exports = api
const prefix = 'https://api.weixin.qq.com'

const api = {

    security:{
        /**
         * [POST] 获取用户访问小程序数据概况
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        imgSecCheck: (access_token) => `${prefix}/wxa/img_sec_check?access_token=${access_token}`,
    },

    analysis: {
        /**
         * [POST] 获取用户访问小程序数据概况
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getDailySummary: (access_token) => `${prefix}/datacube/getweanalysisappiddailysummarytrend?access_token=${access_token}`,
        /**
         * [POST] 获取用户访问小程序日留存
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getDailyRetain: (access_token) => `${prefix}/datacube/getweanalysisappiddailyretaininfo?access_token=${access_token}`,
        /**
         * [POST] 获取用户访问小程序日留存
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getMonthlyRetain: (access_token) => `${prefix}/datacube/getweanalysisappidmonthlyretaininfo?access_token=${access_token}`,

        /**
         * [POST] 获取用户访问小程序周留存
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getWeeklyRetain: (access_token) => `${prefix}/datacube/getweanalysisappidweeklyretaininfo?access_token=${access_token}`,

        /**
         * [POST] 获取用户访问小程序数据日趋势
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getDailyVisitTrend: (access_token) => `${prefix}/datacube/getweanalysisappiddailyvisittrend?access_token=${access_token}`,

        /**
         * [POST] 获取用户访问小程序数据月趋势(能查询到的最新数据为上一个自然月的数据)
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getMonthlyVisitTrend: (access_token) => `${prefix}/datacube/getweanalysisappidmonthlyvisittrend?access_token=${access_token}`,

        /**
         * [POST] 获取用户访问小程序数据周趋势
         * @param begin_date
         * @param end_date
         * @param access_token
         * @return {string}
         */
        getWeeklyVisitTrend: (access_token) => `${prefix}/datacube/getweanalysisappidweeklyvisittrend?access_token=${access_token}`,

        /**
         * [POST] 获取小程序启动性能，运行性能等数据。
         * @param access_token
         * @return {string}
         */
        getPerformanceData: (access_token) => `${prefix}/wxa/business/performance/boot?access_token=${access_token}`,
    },
    img: {
        aiCrop: (img, access_token) => `${prefix}/cv/img/aicrop?img_url=${img}&access_token=${access_token}`,
        scanQRCode: (img, access_token) => `${prefix}/cv/img/qrcode?img_url=${img}&access_token=${access_token}`,
        superresolution: (img, access_token) => `${prefix}/cv/img/superresolution?img_url=${img}&access_token=${access_token}`,
    },

}

module.exports = api
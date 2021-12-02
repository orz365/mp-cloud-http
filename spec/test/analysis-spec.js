const {hcloud} = require('./head')

const fs = require('fs')
const path = require('path')

describe("数据分析", function () {
    it("[analysis.getDailyRetain]获取用户访问小程序日留存", function (done) {
        let data = {
            begin_date: '20211201', end_date: '20211201',
        }
        hcloud.analysis().getDailyRetain(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getMonthlyRetain]获取用户访问小程序月留存", function (done) {
        let data = {
            begin_date: '20211101', end_date: '20211130',
        }
        hcloud.analysis().getMonthlyRetain(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getWeeklyRetain]获取用户访问小程序周留存", function (done) {
        let data = {
            begin_date: '20211101', end_date: '20211107',
        }
        hcloud.analysis().getWeeklyRetain(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getDailySummary]获取用户访问小程序数据概况", function (done) {
        let data = {
            begin_date: '20211101', end_date: '20211101',
        }
        hcloud.analysis().getDailySummary(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getDailyVisitTrend]获取用户访问小程序数据日趋势", function (done) {
        let data = {
            begin_date: '20211101', end_date: '20211101',
        }
        hcloud.analysis().getDailyVisitTrend(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });
    it("[analysis.getMonthlyVisitTrend]获取用户访问小程序数据月趋势", function (done) {
        let data = {
            begin_date: '20211101', end_date: '20211130',
        }
        hcloud.analysis().getMonthlyVisitTrend(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getWeeklyVisitTrend]获取用户访问小程序数据周趋势", function (done) {
        let data = {
            begin_date: '20211101', end_date: '20211107',
        }
        hcloud.analysis().getWeeklyVisitTrend(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getPerformanceData]获取小程序启动性能，运行性能等数据。", function (done) {
        let param = {
            "time": {
                "end_timestamp": 1609689600,
                "begin_timestamp": 1609603200,
            },
            "module": "10022",
            "params": [{
                "field": "networktype",
                "value": "wifi",
            }, {
                "field": "device_level",
                "value": "1",
            }, {
                "field": "device",
                "value": "1",
            }],
        }
        hcloud.analysis().getPerformanceData(param).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getUserPortrait]获取小程序新增或活跃用户的画像分布数据", function (done) {
        let data = {
            begin_date: '20211201',
            end_date: '20211201',
        }
        hcloud.analysis().getUserPortrait(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getVisitDistribution]获取用户小程序访问分布数据", function (done) {
        let data = {
            begin_date: '20211201',
            end_date: '20211201',
        }
        hcloud.analysis().getVisitDistribution(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("[analysis.getVisitPage]获取用户小程序访问分布数据", function (done) {
        let data = {
            begin_date: '20211201',
            end_date: '20211201',
        }
        hcloud.analysis().getVisitPage(data).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });
});
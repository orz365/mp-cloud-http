const {hcloud, db} = require('./head')
const jasmine = require("jasmine");
describe("云开发操作数据库", function () {
    it("增删改查", function (done) {
        db.collection('tb_test').add({
            data: {
                name: 'mp-cloud-http',
            },
        }).then(res => {
            let id = res.id_list[0]
            db.collection('tb_test').where({
                _id: id,
            }).update({
                data: {
                    name: 'mp-cloud-http2',
                },
            }).then(res => {
                db.collection('tb_test').where({
                    _id: id,
                }).remove().then(() => {
                    db.collection('tb_test').get().then(res => {
                        done()
                        console.log(res)
                    })
                })
            })
        })
    });

    it("聚合函数", function (done) {
        let _ = db.command
        let $ = db.command.aggregate
        db.collection('tb_comment').aggregate().lookup({
            from: 'tb_post',
            let: {
                post_id: '$target_id',
            },
            pipeline: $.pipeline()
                .match(
                    _.expr(
                        $.and([
                            $.eq(['$_id', '$$post_id']),
                        ]),
                    ),
                ).project({
                    _id: 1,
                    content: 1,
                }).done(),
            as: 'postList',
        }).limit(1).end().then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it('云函数调用', function (done) {
        hcloud.callFunction({
            name: 'getComment',
        }).then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    })

    it('获取集合信息', function (done) {
        hcloud.collections().get().then(res => {
            console.log(res)
            done()
        }).catch(err => {
            done.fail(err)
        })
    })

});
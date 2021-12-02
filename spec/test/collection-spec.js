const {hcloud, db} = require('./head')

describe("云开发操作数据库", function () {

    it("查询", function (done) {
        hcloud.collection('tb_post').where({
            update_time: db.command.gt(new Date()),
        }).get().then(res => {
            done()
        }).catch(err => {
            done.fail(err)
        })
    });

    it("聚合函数", function (done) {
        let _ = db.command
        let $ = db.command.aggregate
        hcloud.collection('tb_comment').aggregate().lookup({
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
        }).catch(err=>{
            done.fail(err)
        })
    });

    it('云函数调用',function (done){
        hcloud.callFunction({
            name:'getComment'
        }).then(res=>{
            done()
        }).catch(err=>{
            done.fail(err)
        })
    })

    it('获取集合信息',function (done){
        hcloud.collections().get().then(res=>{
            console.log(res)
            done()
        }).catch(err=>{
            done.fail(err)
        })
    })

});
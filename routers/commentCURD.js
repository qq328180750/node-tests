const router = require('koa-router')();
let nowStatus = require('../middlewares/check')
const storeModel = require('../lib/mysql')
const multer = require('koa-multer');
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({storage: storage});


router.get('/comment', async (ctx, next) => {//获取所有评论
    await storeModel.queryComment().then(res => {
        ctx.response.body = res
    })
})
router.get('/comment/:id', async (ctx, next) => {//获取指定商品的评论
    await storeModel.queryComment(ctx.params.id).then(res => {
        if (res && res.length !== 0) {
            ctx.response.body = {code: 200, data: res}
        } else {
            ctx.response.body = {code: "error", msg: "没找到对应此商品的评论"}
        }
    })
})
router.post('/comment', async (ctx, next) => {//添加一条评论
    let date = Date.now();
    ctx.request.body.commentTime = date;
    await storeModel.addComment(ctx.request.body).then(res => {
        ctx.response.body = {code:200,msg:"ok"}
    }).catch(err => {
        console.log(err.sqlMessage)
        ctx.response.body = {code:"error",msg:"数据非法"}
    })
})
router.put('/comment', async (ctx, next) => {//修改评论
    await storeModel.updateComment(ctx.request.body).then(res => {
        console.log(res)
        if (res.affectedRows !== 0) {
            if (res.changedRows !== 0) {
                ctx.response.body = {code: "ok", msg: "商品更新成功"}
            } else {
                ctx.response.body = {code: "error", msg: "数据相同"}
            }

        } else {
            ctx.response.body = {code: "error", msg: "商品编码有误，未找到数据"}
        }

    }).catch(err => {
        console.log(err.sqlMessage)
    })
})
router.del('/comment', async (ctx, next) => {//删除评论
    await storeModel.deleteComment(ctx.request.body.commentNo).then(res=>{
        if(res.affectedRows!==0){
            ctx.response.body = {code:"ok",msg:"删除成功"}
        }else {
            ctx.response.body = {code:"error",msg:"没有此编号"}
    }
    }).catch(err=>{
        console.log(err)
    })
})
module.exports = router;
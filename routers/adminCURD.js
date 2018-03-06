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
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });

router.get('/admstore', async (ctx, next) => {//获取所有商品
    await storeModel.queryStore().then(res=>{
        ctx.response.body = res
    })
})
router.get('/admstore/:id', async (ctx, next) => {//获取指定商品
    await storeModel.queryStore(ctx.params.id).then(res=>{
        if(res&&res.length!==0){
            ctx.response.body = {code:200,data:res}
        }else {
            ctx.response.body = {code:"error",msg:"没找到此编号商品"}
        }
    })
})
router.post('/admstore', upload.single('file'),async (ctx, next) => {//增加商品
    await console.log(ctx.req.file)
    // await storeModel.addStore(ctx.request.body).then(res=>{
    //     console.log(res)
    // }).catch(err=>{
    //     console.log(err.sqlMessage)
    // })
})
router.put('/admstore', async (ctx, next) => {//更新商品
    await storeModel.updateStore(ctx.request.body).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err.sqlMessage)
    })
})
router.del('/admstore', async (ctx, next) => {//删除商品
    await ctx.render('signup', {
        session: ctx.session
    })
})



module.exports = router;
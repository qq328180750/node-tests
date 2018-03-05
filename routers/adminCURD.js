const router = require('koa-router')();
let nowStatus = require('../middlewares/check')
const storeModel = require('../lib/mysql')


router.get('/adm', async (ctx, next) => {//获取所有商品
    await ctx.render('signup', {
        session: ctx.session
    })
})
router.get('/adm/:id', async (ctx, next) => {//获取指定商品
    await ctx.render('signup', {
        session: ctx.session
    })
})
router.post('/adm', async (ctx, next) => {//增加商品
    await ctx.render('signup', {
        session: ctx.session
    })
})
router.put('/adm', async (ctx, next) => {//更新商品
    await ctx.render('signup', {
        session: ctx.session
    })
})
router.del('/adm', async (ctx, next) => {//删除商品
    await ctx.render('signup', {
        session: ctx.session
    })
})



module.exports = router;
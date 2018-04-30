const router = require('koa-router')();



router.get('/', async (ctx, next) => {
    let title = '网页主体部分'
    await ctx.render('home',{
        title
    })
})


module.exports = router;
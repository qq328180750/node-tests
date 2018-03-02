const router = require('koa-router')();


router.get('/signup',async(ctx,next)=>{
    await ctx.render('signup',{
        session:ctx.session
    })
})

router.post('/signup',async(ctx,next)=>{
     console.log(ctx.request)

})

module.exports = router
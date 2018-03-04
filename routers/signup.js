const router = require('koa-router')();
const userModel = require('../lib/mysql');
const MysqlStore = require('koa-mysql-session');


router.get('/signup', async (ctx, next) => {
    await ctx.render('signup', {
        session: ctx.session
    })
})
//登录
router.post('/signup', async (ctx, next) => {
    await userModel.loginUser(ctx.request.body.username).then(result => {
        console.log(ctx.session.user)
        if (result.length !== 0 && result[0].password === ctx.request.body.password) {
            ctx.response.body = {code: 200, msg: "登录成功"}
            ctx.session.user = {username: ctx.request.body.username}
        } else {
            ctx.response.body = {code: 401, msg: "用户名或密码错误"}
        }
    })
})
//注册
router.post('/register', async (ctx, next) => {
    await userModel.registerUser([ctx.request.body.username, ctx.request.body.password]).then(result => {
        console.log(result)
        if (result.affectedRows > 0) {
            ctx.response.body = {code: 200, msg: "注册成功"}
        } else {
            ctx.response.body = {code: 401, msg: "注册失败"}
        }
    }).catch(err => {
        console.log("errno:", err.errno, "sqlMessage:", err.sqlMessage)
        ctx.response.body = {code: 401, msg: "注册失败"}
    })
})
//登出
router.get('/logout', async (ctx, next) => {
    ctx.session = null;
    ctx.response.body = {code:200,msg:"用户已登出"}
})
//检查用户是否已经登录
router.get('/checkLogin', async (ctx, next) => {
    // console.log(MysqlStore.prototype.get("USER_SID:"+ctx.cookies.get('USER_SID')))
    if(ctx.session&&ctx.session.user){
        ctx.response.body = {code:200,msg:"用户已登录",data:ctx.session.user}
    }else {
        ctx.response.body = {code:403,msg:"用户未登录请先登录"}
    }
})



module.exports = router;
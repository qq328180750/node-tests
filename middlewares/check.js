const MysqlStore = require('koa-mysql-session');
const config = require('../config/default.js');
const sessionMysqlConfig = {
    database:config.database.DATABASE,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    host:config.database.HOST
};
let mysqls = new MysqlStore(sessionMysqlConfig)

module.exports = {
    nowUser:async (ctx)=>{
        if(ctx.cookies.get('USER_SID')) {
            let ses = await mysqls.get("USER_SID:" + ctx.cookies.get('USER_SID'))//合法性校验与数据库进行对比
            if (ctx.session && ses && JSON.stringify(ctx.session.user) === JSON.stringify(ses.user)) {
                return {code: 200, msg: "用户已登录", data: ctx.session.user}
            } else {
                return {code: 403, msg: "用户未登录请先登录"}
            }
        }else {
            return {code: 403, msg: "用户未登录请先登录"}
        }
    }
}
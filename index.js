const Koa=require('koa');
const path=require('path');
const bodyParser = require('koa-bodyparser');
const ejs=require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router=require('koa-router');
const views = require('koa-views');
const app = new Koa();

const sessionMysqlConfig = {
    database:config.database.DATABASE,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    host:config.database.HOST
};

app.use(session({
    key:'USER_SID',
    store:new MysqlStore(sessionMysqlConfig)
}))


app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

app.use(require('./routers/signup.js').routes())

app.listen(3000)
console.log('listening on port'+config.port)



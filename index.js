const Koa=require('koa');
const path=require('path');
const bodyParser = require('koa-bodyparser');
const ejs=require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router=require('koa-router');
const views = require('koa-views');
const serve = require('koa-static');
const app = new Koa();

//socket.io
const httpServer = require('http').Server(app.callback());
const io = require('socket.io')(httpServer)


const sessionMysqlConfig = {
    database:config.database.DATABASE,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    host:config.database.HOST
};
app.use(serve(path.join(__dirname, './public/html'),{ extensions: ['html']}));
app.use(session({
    key:'USER_SID',
    store:new MysqlStore(sessionMysqlConfig),
    cookie:{
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false,        // 是否允许重写
    }
}))

app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(bodyParser({
    formLimit: '1mb'
}))

app.use(require('./routers/signup.js').routes())//用户登录、注册、登录校验
app.use(require('./routers/adminCURD.js').routes())//后台商品的设置

io.on('connection', function(socket){
    console.log(io.sockets.sockets)
    console.log('a user connected');
    socket.on('chat message',function (msg) {
        io.emit('chat message',msg)
    })
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

httpServer.listen(3000,()=>{
    console.log('listening on port:'+config.port)
})



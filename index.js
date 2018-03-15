const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const ejs = require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router = require('koa-router');
const views = require('koa-views');
const serve = require('koa-static');
const _ = require('lodash');
const socketIoUtils = require('./lib/socketio')
const app = new Koa();

//socket.io
const httpServer = require('http').Server(app.callback());
const io = require('socket.io')(httpServer);
let socketArr = [];//存储用户名和对应的socket信息


const sessionMysqlConfig = {
    database: config.database.DATABASE,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    host: config.database.HOST
};
app.use(serve(path.join(__dirname, './public/html'), {extensions: ['html']}));
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig),
    cookie: {
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

io.on('connection', function (socket) {
    // console.log(io.sockets.sockets)
    // console.log('a user connected');
    //对应用户设置名字
    socket.on('setmyname', function (names) {
        if(names===''||_.findIndex(socketArr,o=>{return o.socketId===socket.id})!==-1)return
        let tempObj = {names: names, socketId: socket.id};
        let num = _.findIndex(socketArr,o=>{return o.names===names});
        if (num===-1){
            //队列里没有push进去
            socketArr.push(tempObj);
        }else {
            //队列里有，从原位置删除并push到最后
            socketArr.push(socketArr.splice(num,1)[0])
        }
        console.log(socketArr);
    })
    //给指定人发送信息
    socket.on('sayTo', function (data) {
        socketIoUtils.addmessage(data)
        let num = _.findIndex(socketArr,o=>{return o.names===data.toname});
        io.sockets.sockets[socketArr[num].socketId].emit('onmessage', data.msg);
    })
    //排名
    socket.on('ranking', function () {
        let num = _.findIndex(socketArr,o=>{return o.socketId===socket.id});
        if (num===-1)return
        socket.emit('myranking',num)
    })
    //所有人广播
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        // console.log('user disconnected');
        //若下线，则删除指定用户
        // console.log(socket.id)
        let num = _.findIndex(socketArr,o=>{return o.socketId===socket.id})
        socketIoUtils.disconnectDb(socketArr[num].names)
        _.remove(socketArr,o=>{return o.socketId===socket.id})
        // console.log(socketArr)
        io.emit('offline')
    });
});

httpServer.listen(3000, () => {
    console.log('listening on port:' + config.port)
})



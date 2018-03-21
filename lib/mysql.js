let mysql = require('mysql');
let config = require('../config/default');

let pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

//用户登录
let loginUser = function (username) {
    let _sql = `select password from user where username="${username}";`;
    return query(_sql)
}
//用户注册
let registerUser = function (value) {
    let _sql = `insert into user set username=?,password=?;`;
    return query(_sql, value)
}
//查询商品
let queryStore = function (itemNo) {
    let _sql;
    if (itemNo) {
        _sql = `select * from adminStore where itemNo="${itemNo}";`;
    } else {
        _sql = `select * from adminStore;`;
    }
    return query(_sql)
}
//增加商品
let addStore = function (value) {
    // cname=?,type=?,total=?,itemNo=?,imgArr=?,content=?,commentNo=?,score=?
    let _sql = `insert into adminStore set ?;`;
    return query(_sql, value)
}
//更新商品
let updateStore = function (value) {
    let itemNo = value.itemNo
    for (item in value){
        if(value[item]===""||item==="itemNo"){
            delete value[item]
        }
    }
    let _sql = `update adminStore set ? where itemNo=${itemNo};`;
    return query(_sql,value)

}
//删除商品
let deleteStore = function (itemNo) {
    let _sql = `delete from adminStore where itemNo=${itemNo};`;
    return query(_sql)
};
//聊天记录--查询指定用户记录
let findMessageUser = function (username) {
    let _sql = `select * from websocketIo where username="${username}";`;
    return query(_sql)
}
//聊天记录--指定用户新建记录
let saveMessageUser = function (data) {
    let _sql = `insert into websocketIo set ?;`;
    return query(_sql,data)
}
//聊天记录--更新用户聊天记录
let updateMessageUser = function (data,username) {
    let _sql = `update websocketIo set content='${data}' where username="${username}";`;
    return query(_sql,data)
}
//查询对应商品的评论
let queryComment = function (itemNo) {
    let _sql;
    if (itemNo){
        _sql = `select * from comment where itemNo=${itemNo};`;
    }else {
        _sql = `select * from comment;`;
    }
    return query(_sql);
}
//添加评论
let addComment = function (data) {
    let _sql = `insert into comment set ?;`;
    return query(_sql,data)
}
//修改评论
let updateComment = function (commentNo,data) {
    let _sql = `update comment set ? where commentNo=${commentNo};`;
    return query(_sql,data)
}
//删除评论
let deleteComment = function (commentNo) {
    let _sql = `delete from comment where commentNo=${commentNo};`;
    return query(_sql)
}
//==用户订单
//查看所有订单


module.exports = {
    loginUser,
    registerUser,
    queryStore,
    addStore,
    updateStore,
    deleteStore,
    findMessageUser,
    saveMessageUser,
    updateMessageUser,
    queryComment,
    addComment,
    updateComment,
    deleteComment
}
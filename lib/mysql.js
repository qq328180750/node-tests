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
let deleteStore = function (itemNo) {
    let _sql = `delete from adminStore where itemNo=${itemNo};`;
    return query(_sql)
}


module.exports = {
    loginUser,
    registerUser,
    queryStore,
    addStore,
    updateStore,
    deleteStore
}
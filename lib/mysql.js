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
    return query(_sql,value)
}

module.exports = {
    loginUser,
    registerUser
}
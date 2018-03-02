let mysql = require('mysql');
let config = require('../config/default');

let pool  = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
});

let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })

}
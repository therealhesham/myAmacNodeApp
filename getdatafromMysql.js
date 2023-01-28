const mysql = require("mysql")

function getData(table){
    
  
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kindaboy27',
        database: 'sakila',
        multipleStatements: true
        }).query(`select * from ${table}` ,function (err, result, fields) {
      if (err) throw err;
      console.log(result)})

}


module.exports.my =getData
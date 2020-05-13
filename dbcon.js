var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'mysqlbandaid.cfrmcgrcrjey.us-east-1.rds.amazonaws.com',
  user : 'admin',
  password : 'v3rys3cur3',
  database : 'Band_Aid_mariadb',
});

module.exports.pool = pool;
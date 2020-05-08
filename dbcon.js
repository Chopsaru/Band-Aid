var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'band-aid-madiadb.cdcjmss5gofv.us-east-1.rds.amazonaws.com',
  user : 'admin',
  password : 'v3rys3cur3',
  database : 'band-aid-madiadb',
});

module.exports.pool = pool;

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : 'BeaverNation3!4',
  database : 'band-aid',
});

module.exports.pool = pool;

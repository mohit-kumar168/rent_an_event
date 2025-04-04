const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: '#',
  database: 'rent_an_event',
});

module.exports = pool;

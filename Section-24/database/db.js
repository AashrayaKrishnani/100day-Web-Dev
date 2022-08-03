const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "blogs",
  user: "root",
  password: "iocl@99#",
});

module.exports = pool;

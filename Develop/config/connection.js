const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localHost",
  user: "root",
  password: "bootcamp",
  database: "company_db",
});

module.exports = db;

const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "travelNest27",
  database: "travelNest",
});

module.exports = pool.promise();

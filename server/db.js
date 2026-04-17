// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || "nozomi.proxy.rlwy.net",
  user: process.env.MYSQLUSER || process.env.DB_USER || "root",
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "boMKjNJmgoEcGjpeUlGJqFOcVdiRPDti",
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || "railway",
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306 || 47122,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
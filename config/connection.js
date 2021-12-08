const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeesTracker_db'
});


connection.connect((err) => {
    if (err) throw err;
});
module.exports = connection;
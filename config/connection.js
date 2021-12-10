const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employeeTracker_db'
});
connection.connect(function(err) {
    if (err) throw err;
})
module.exports = connection;
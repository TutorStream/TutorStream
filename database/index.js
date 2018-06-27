const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: 'TutorStream',
  port: 3306
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log('You\'ve connected to the Database!');
});

module.exports = connection;

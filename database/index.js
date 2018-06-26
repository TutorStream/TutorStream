const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'TutorStream'
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log('You\'ve connected to the Database!');
});

module.exports = connection;
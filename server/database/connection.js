const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log('Database connected');
});

exports.connection = connection;

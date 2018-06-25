const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'TutorStream'
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log('Database connected');
});

exports.connection = connection;

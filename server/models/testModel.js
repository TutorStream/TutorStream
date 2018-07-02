const db = require('./../../database');

exports.getTests = (callback) => {
  let queryStr = 'SELECT * FROM tests ORDER BY name';
  db.query(queryStr, callback);
};

exports.selectTest = (testId, callback) => {
  let queryStr = `SELECT * FROM tests WHERE ID = ${testId}`;
  db.query(queryStr, callback);
};
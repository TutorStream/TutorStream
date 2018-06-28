const db = require('./../../database');

exports.getTests = (callback) => {
  let queryStr = 'SELECT * FROM tests ORDER BY name';
  db.query(queryStr, callback);
};

exports.selectTest = (testID, callback) => {
  let queryStr = `SELECT * FROM tests WHERE ID = ${testID}`;
  db.query(queryStr, callback);
};
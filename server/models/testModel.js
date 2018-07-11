const db = require('./../../database');

exports.getTests = (callback) => {
  let queryStr = 'SELECT * FROM tests ORDER BY Name';
  db.query(queryStr, callback);
};

exports.selectTest = (testId, callback) => {
  let queryStr = `SELECT * FROM tests WHERE id = ${testId}`;
  db.query(queryStr, callback);
};

exports.getTutorTests = (userid, callback) => {
  let queryStr = `SELECT * FROM tutor_tests WHERE tutor_id = ${userid}`;
  db.query(queryStr, callback);
};

exports.getTestInfo = (testArray, callback) => {
  let queryStr = `SELECT * FROM tests WHERE id IN (${testArray})`;
  db.query(queryStr, callback);
};
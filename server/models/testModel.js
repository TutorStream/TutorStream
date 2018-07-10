const db = require('./../../database');

exports.getTests = (callback) => {
  let queryStr = 'SELECT * FROM tests ORDER BY Name';
  db.query(queryStr, callback);
};

exports.selectTest = (testId, callback) => {
  let queryStr = `SELECT * FROM tests WHERE id = ${testId}`;
  db.query(queryStr, callback);
};

exports.getTutorTests = (userID, callback) => {
  let queryStr = `SELECT * FROM tutor_tests WHERE tutor_id = ${userID}`;
  db.query(queryStr, callback);
};

exports.getTestInfo = (testArray, callback) => {
  let queryStr = `SELECT * FROM tests WHERE id IN (${testArray})`;
  db.query(queryStr, callback);
};
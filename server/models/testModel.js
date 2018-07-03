const db = require('./../../database');

exports.getTests = (callback) => {
  let queryStr = 'SELECT * FROM tests ORDER BY Name';
  db.query(queryStr, callback);
};

exports.selectTest = (testId, callback) => {
  let queryStr = `SELECT * FROM tests WHERE ID = ${testId}`;
  db.query(queryStr, callback);
};

exports.getTutorTests = (userID, callback) => {
  console.log('I am in test model getting tests')
  let queryStr = `SELECT * FROM tutor_tests WHERE tutor_id = ${userID}`;
  db.query(queryStr, callback);
};
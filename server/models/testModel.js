const db = require('./../../database');

exports.getTests = (callback) => {
  let queryStr = 'SELECT * FROM tests ORDER BY name';
  db.query(queryStr, callback);
};

exports.selectTest = (testID, callback) => {
  let queryStr = `SELECT * FROM tests WHERE ID = ${testID}`;
  db.query(queryStr, callback);
};

exports.getTutorTests = (userID, callback) => {
  console.log('I am in test model getting tests')
  let queryStr = `SELECT * FROM tutor_tests WHERE tutor_id= ${userID}`;
  db.query(queryStr, callback);
};
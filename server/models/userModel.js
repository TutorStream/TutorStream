const db = require('./../../database');

exports.addNewUser = (newUser, callback) => {
  let queryStr = 'INSERT INTO users (NAME, Password, Email, Tutor, Bio) VALUES ?;';
  let params = [newUser.username, newUser.password, newUser.email, newUser.isTutor, newUser.bio];
  db.query(queryStr, params, callback);
};

exports.addNewUserTests = (tests, callback) => {
  let queryStr = 'INSERT INTO user_tests (user_id, test_id) VALUES ?;'
  let params = newUser.tests; // this should already be an array
  db.query(queryStr, params, callback);
};

exports.loginUser = (userCreds, callback) => {
  let queryStr = `SELECT * FROM users WHERE Name = ${userCreds.username} AND WHERE Password = ${userCreds.password};`
  db.query(queryStr, callback);
;}

const db = require('./../../database');

exports.addNewUser = (newUser, callback) => {
  let queryStr = 'INSERT INTO users (Name, Password, Email, Tutor, Bio) VALUES (?, ?, ?, ?, ?);';
  let params = [newUser.Name, newUser.Password, newUser.Email, newUser.Tutor, newUser.Bio];
  db.query(queryStr, params, callback);
};

exports.addNewUserTests = (userId, testId, callback) => {
  let queryStr = `INSERT INTO user_tests (user_id, test_id) VALUES (${userId}, ${testId});`
  db.query(queryStr, callback);
};

exports.loginUser = (userCreds, callback) => {
  let queryStr = 'SELECT * FROM users WHERE Email = ? AND Password = ?;'
  var params = [userCreds.Email, userCreds.Password];
  db.query(queryStr, params, callback)
}



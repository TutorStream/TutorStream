const db = require('./../../database');

exports.addNewUser = (newUser, callback) => {
  let queryStr = '';
  let params = [newUser.id, newUser];
  db.query(queryStr, params, callback);
};

// deals with new tests
exports.addNewUserTests = (newUser, callback) => {
  // simply send thru entire newUserObj? take off what we need : user id && test Id
  let queryStr = 'INSERT INTO user_tests (user_id, test_id) VALUES ?;'
  let params = newUser.tests; // this should already be an array
  db.query(queryStr, params, callback);
};

exports.loginUser = () => {

;}



// create user model helpers -->
  // addnewUser
  // check if User exists
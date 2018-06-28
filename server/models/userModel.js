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
  console.log('usercreds ', userCreds);
  let queryStr = 'SELECT * FROM users WHERE Email = ? AND Password = ?;' // just send back ID
  // create a query that only gets all the test ids for a particular Name (use LEFT INNER jOIN?)
  // would then need to somehow get all tutors (user with tutor = 1) that also teach this test?
  // crate nested query?
  let params = [userCreds.Email, userCreds.Password];
  db.query(queryStr, params, callback);
  // db.query(queryStr, params, (err, userResults) => {
  //   if(err) {
  //     console.error('There was an error getting user info from db')
  //   } else {
  //     console.log(results, 'should be all user info');
  //     let queryStr = `SELECT * FROM user_tables WHERE user_id = ${userResults.ID};`;
  //     db.query(queryStr, callback); // should return the array of tests for that user
  //   }
  // });
};



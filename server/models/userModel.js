const db = require('./../../database');

exports.addNewUser = (newUser, callback) => {
  let queryStr =
    'INSERT INTO users (Name, Password, Email, Tutor, Bio) VALUES (?, ?, ?, ?, ?)';
  let params = [
    newUser.name,
    newUser.password,
    newUser.email,
    newUser.tutor,
    newUser.bio
  ];
  db.query(queryStr, params, callback);
};

exports.addNewUserTests = (userId, testId, callback) => {
  let queryStr = `INSERT INTO user_tests (user_id, test_id) VALUES (${userId}, ${testId})`;
  db.query(queryStr, callback);
};

exports.loginUser = (userCreds, callback) => {
  let queryStr = 'SELECT * FROM users WHERE Email = ? AND Password = ?';
  let params = [userCreds.Email, userCreds.Password];
  db.query(queryStr, params, callback);
};

exports.getUserInfoDB = (userId, callback) => {
  let queryStr = `SELECT * FROM users where id = ${userId}`;
  db.query(queryStr, callback);
};

exports.getUsernameById = (userId, callback) => {
  let queryStr = `SELECT Name FROM users where id = ${userId}`;
  db.query(queryStr, callback);
};

exports.updateUser = (form, callback) => {
  let updateStr = `UPDATE users SET Bio = ?, Name = ? WHERE id = ${form.id}`;
  db.query(updateStr, [form.userBio, form.name], callback);
};

exports.addPhoto = (userPhoto, callback) => {
  let queryStr = `INSERT INTO photos (user_id, location) VALUES (?, ?)`;
  db.query(queryStr, [userPhoto.user_id, userPhoto.location], callback);
};

exports.updatePhoto = (userPhoto, callback) => {
  let updateStr = `UPDATE photos SET location = '${
    userPhoto.location
  }' WHERE user_id = ${userPhoto.user_id}`;
  db.query(updateStr, callback);
};

exports.getPhoto = (userId, callback) => {
  let queryStr = `SELECT location FROM photos WHERE user_id = ${userId}`;
  db.query(queryStr, callback);
};

const db = require('./../../database');

exports.addFeedback = ({ID, user_id, tutor_id, rating, content, date, time}, callback) => {
  let queryStr = 'INSERT INTO feedback (ID, user_id, tutor_id, rating, content, date, time) VALUES (?, ?, ?, ?, ?, ?, ?);';
  let params = [ID, user_id, tutor_id, rating, content, date, time];
  db.query(queryStr, params, callback);
};

exports.updateFeedback = ({rating, content}, callback) => {
  let queryStr = 'INSERT INTO feedback (rating, content) VALUES (?, ?)';
  let params = [rating, content];
  db.query(queryStr, params, callback);
};
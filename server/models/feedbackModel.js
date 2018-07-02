const db = require('./../../database');

exports.addFeedback = ({ID, id, tutor_id, rating, content, date, time}, callback) => {
  let queryStr = 'INSERT INTO feedback (ID, id, tutor_id, rating, content, date, time) VALUES (?, ?, ?, ?, ?, ?, ?);';
  let params = [ID, id, tutor_id, rating, content, date, time];
  db.query(queryStr, params, callback);
};

exports.updateFeedback = ({rating, content}, callback) => {
  let queryStr = 'INSERT INTO feedback (rating, content) VALUES (?, ?)';
  let params = [rating, content];
  db.query(queryStr, params, callback);
};
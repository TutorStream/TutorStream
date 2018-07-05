const db = require('./../../database');

exports.addFeedback = (
  { id, tutor_id, rating, content, date, time },
  callback
) => {
  let queryStr =
    'INSERT INTO feedback (user_id, tutor_id, rating, content, date, time) VALUES (?, ?, ?, ?, ?, ?, ?);';
  let params = [ID, id, tutor_id, rating, content, date, time];
  db.query(queryStr, params, callback);
};

exports.updateFeedback = ({ rating, content }, callback) => {
  let queryStr = 'INSERT INTO feedback (rating, content) VALUES (?, ?)';
  let params = [rating, content];
  db.query(queryStr, params, callback);
};

exports.getFeedback = ({ id }, callback) => {
  let queryStr = `SELECT * FROM feedback WHERE tutor_id = ${id}`;
  db.query(queryStr, callback);
};

const db = require('./../../database');

exports.addSession = ({ test_id, tutor_id, id, date, time }, callback) => {
  let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date, time) VALUES (${test_id}, ${tutor_id}, ${id}, '${date}', '${time}');`;
  db.query(queryStr, callback);
};

exports.deleteSession = ({ id }, callback) => {
  let queryStr = `DELETE FROM sessions WHERE id = ${id}`;
  db.query(queryStr, callback);
};

// exports.updateSession = () => {

// };

exports.getSession = (id, callback) => {
  // still need to decide whether to sort
  // need name field tutors table
  let queryStr = `SELECT * FROM sessions JOIN tutors ON sessions.tutor_id = tutors.id WHERE student_id = ${id} ORDER BY date DESC`;
  db.query(queryStr, callback);
};

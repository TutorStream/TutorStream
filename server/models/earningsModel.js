const db = require('./../../database');

exports.getEarnings = (data, callback) => {
  let queryStr = `select * from earnings where tutor_id =${data}`;
  db.query(queryStr, callback);
};

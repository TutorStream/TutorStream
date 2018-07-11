const db = require('./../../database');

exports.getEarnings = (data, callback) => {
  console.log('data:', data)
  let queryStr = `select * from earnings where tutor_id =${data}`
  db.query(queryStr,callback)
};

exports.updateEarnings = (data, callback) => {

};

exports.addEarnings = (data , callback) => {
  
};

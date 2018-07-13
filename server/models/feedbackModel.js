const db = require('./../../database');

exports.addFeedback = (data, callback) => {
  const { user_id, tutor_id, rating, feedback, date, time } = data;
  let queryStr =                                                                     
    `INSERT INTO feedback (user_id, tutor_id, rating, content, date, time) VALUES (?, ?, ?, ?, ?, ?)`
    let params = [Number(user_id), Number(tutor_id), Number(rating), String(feedback),String(date), String(time)]
  db.query(queryStr, params,(err,result)=>{
    // get number of total sessions tutor gave.. divide total rating points by that number
    if (err) {
      console.error('There was an error adding feedback: ', err);
    } else {
      let average = `select AVG(rating) AS Average from feedback where tutor_id = ${tutor_id}`
      db.query(average, (err,results)=>{
        if(err){
          console.error('error inserting feedback : ',err);
        } else {
          let newQueryStr = `Update tutors Set rating=${results[0].Average} where id = ${tutor_id}`;
          db.query(newQueryStr,(err,results)=>{
            if(err){
              callback(err);
            } else {
              callback(null, results);
            }
          });
        }
      });
    }
  });
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

const db = require('./../../database');

exports.addFeedback = (data, callback) => {
  const { user_id, tutor_id, rating, feedback, date, time } = data;
  console.log("We're about to add feedback")
  let queryStr =                                                                      //(3,11, 4, 'Jess is great', '2017-12-12', '12:09:30')
    `INSERT INTO feedback (user_id, tutor_id, rating, content, date, time) VALUES (?, ?, ?, ?, ?, ?)`
    let params = [Number(user_id), Number(tutor_id), Number(rating), String(feedback),String(date), String(time)]
  db.query(queryStr, params,(err,result)=>{
    console.log('but did we get here? ')
    // get number of total sessions tutor gave.. divide total rating points by that number
    if (err) {
      console.error('There was an error adding feedback: ', err);
    } else {
      let average = `select AVG(rating) AS Average from feedback where tutor_id = ${tutor_id}`
     db.query(average, (err,results)=>{
       if(err){
         console.error('error inserting feedback : ',err);
       }else {
         console.log('average results : ',results[0].Average)
        let newQueryStr = `Update tutors Set rating=${results[0].Average} where ID = ${tutor_id}`;
        db.query(newQueryStr,(err,results)=>{
          if(err){
            console.log('error : ', err)
            callback(err);
          }else {
            callback(null,results)
          }
       })
     }
    })
  }
  })
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

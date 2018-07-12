const db = require('./../../database');

exports.addSession = (
  { test_id, tutor_id, id, date, time, rate },
  callback
) => {
  let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date, time, current_rate) VALUES (${test_id}, ${tutor_id}, ${id}, '${date}', '${time}', ${rate});`;
  db.query(queryStr, (err,results)=>{
    if(err) console.error(err);
    else{
      let conditionalUpdate = `select * from earnings where tutor_id = ${tutor_id} and date ='${date}'`
      db.query(conditionalUpdate,(err,results)=>{
        if(err) console.error(err);
        else {
          console.log('results exists ??? : ', results[0].day_earnings)
            if(results.length === 0){
              let queryStr2 = `INSERT INTO earnings (date, tutor_id, day_earnings) VALUES ('${date}',${tutor_id},${rate});`
              db.query(queryStr2,callback);
            }else{ //an earning has already been initiated for current date
              var total = results[0].day_earnings + rate;
              console.log('total : ', total)
              console.log('we would like to update earnings to new earnings')
              let queryStr2 = `UPDATE earnings SET day_earnings = ${total} where tutor_id = ${tutor_id} and date ='${date}'`
              db.query(queryStr2,callback);
            }
        }
      })
  }
  })
};

exports.deleteSession = ({ id }, callback) => {
  let queryStr = `DELETE FROM sessions WHERE id = ${id}`;
  db.query(queryStr, callback);
};

exports.updateSession = (id, callback) => {
  console.log("We're here updating session to complete id is : ", id);
  let queryStr = `UPDATE sessions SET complete = 1 WHERE id = ${id}`;
  db.query(queryStr, callback);
};

exports.getSession = (form, callback) => {
  // still need to decide whether to sort
  // need name field tutors table

  if (form.isTutor) {
    console.log('is tutor', form);
    let queryStr = `SELECT * FROM sessions JOIN users ON sessions.student_id = users.id WHERE tutor_id = ${Number(
      form.id
    )} AND complete = 0 ORDER BY date ASC, time ASC`;
    db.query(queryStr, callback);
  } else {
    //user is a student and not a tutor
    let queryStr = `SELECT * FROM sessions JOIN tutors ON sessions.tutor_id = tutors.id WHERE student_id = ${
      form.id
    }  AND complete = 0 ORDER BY date ASC, time ASC`;
    db.query(queryStr, callback);
  }
};

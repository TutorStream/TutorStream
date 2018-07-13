const db = require('./../../database');

exports.addSession = ({ test_id, tutor_id, id, date, time, rate }, callback) => {
  let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date, time, current_rate) VALUES (${test_id}, ${tutor_id}, ${id}, '${date}', '${time}', ${rate});`;
  db.query(queryStr, (err,results)=>{
    if(err) {
      console.error(err);
    } else {
      let conditionalUpdate = `select * from earnings where tutor_id = ${tutor_id} and date ='${date}'`
      db.query(conditionalUpdate,(err,results)=>{
        if(err) console.error(err);
        else {
          if(results.length === 0){
            let queryStr2 = `INSERT INTO earnings (date, tutor_id, day_earnings) VALUES ('${date}',${tutor_id},${rate});`
            db.query(queryStr2,callback);
          } else {
            var total = results[0].day_earnings + rate;
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
  let queryStr = `UPDATE sessions SET complete = 1 WHERE id = ${id}`;
  db.query(queryStr, callback);
};

exports.getSession = (form, callback) => {
  if (form.isTutor) {
    let queryStr = `SELECT * FROM users RIGHT JOIN sessions ON users.id = sessions.student_id WHERE tutor_id = ${form.id} AND complete = 0 ORDER BY date ASC, time ASC`;
    db.query(queryStr, callback);
  } else {
    let queryStr = `SELECT * FROM tutors RIGHT JOIN sessions ON tutors.id = sessions.tutor_id WHERE student_id = ${form.id} AND complete = 0 ORDER BY date ASC, time ASC`;
    db.query(queryStr, callback);
  }
};

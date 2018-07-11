const db = require('./../../database');

exports.addSession = ({test_id, tutor_id, id, date, time, rate}, callback) => {
    let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date, time, current_rate) VALUES (${test_id}, ${tutor_id}, ${id}, '${date}', '${time}', ${rate});`;
    db.query(queryStr, callback);
};

exports.deleteSession = ({id}, callback) => {
    let queryStr = `DELETE FROM sessions WHERE id = ${id}`;
    db.query(queryStr, callback);
};

exports.updateSession = (id,callback) => {
    console.log("We're here updating session to complete id is : ", id)
    let queryStr = `UPDATE sessions SET complete = 1 WHERE id = ${id}`
    db.query(queryStr, callback);
};

exports.getSession = (form, callback) => {
    // still need to decide whether to sort 
    // need name field tutors table
    console.log('does this work? outside', typeof form.isTutor)
    if(form.isTutor){
        console.log('Current user is a tutor', form.isTutor)
        let queryStr = `SELECT * FROM sessions WHERE tutor_id = ${form.id} AND complete = 0 ORDER BY date ASC, time ASC`;
        db.query(queryStr, callback);
    }else{//user is a student and not a tutor
        console.log('Current user is a student', form.isTutor)
        let queryStr = `SELECT * FROM sessions WHERE student_id = ${form.id}  AND complete = 0 ORDER BY date ASC, time ASC`;
        db.query(queryStr, callback);
    }
    
};


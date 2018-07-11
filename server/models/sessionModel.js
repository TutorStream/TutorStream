const db = require('./../../database');

exports.addSession = ({test_id, tutor_id, id, date, time}, callback) => {
    let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date, time) VALUES (${test_id}, ${tutor_id}, ${id}, '${date}', '${time}');`;
    db.query(queryStr, callback);
};

exports.deleteSession = ({id}, callback) => {
    let queryStr = `DELETE FROM sessions WHERE id = ${id}`;
    db.query(queryStr, callback);
};

exports.updateSession = (id,callback) => {
    let queryStr = `UPDATE sessions SET complete = 1 WHERE id = ${id}`
    db.query(queryStr, callback);
};

exports.getSession = (form, callback) => {
    if(form.isTutor){
        let queryStr = `SELECT * FROM sessions WHERE tutor_id = ${form.id} AND complete = 0 ORDER BY date ASC, time ASC`;
        // let queryStr = `SELECT * FROM sessions WHERE tutor_id = ${form.id} AND complete = 0 ORDER BY date ASC, time ASC`;
        db.query(queryStr, callback);
    } else {
        let queryStr = `SELECT * FROM sessions WHERE student_id = ${form.id}  AND complete = 0 ORDER BY date ASC, time ASC`;
        // let queryStr = `SELECT * FROM sessions WHERE student_id = ${form.id}  AND complete = 0 ORDER BY date ASC, time ASC`;
        db.query(queryStr, callback);
    }
    
};


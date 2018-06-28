const db = require('./../../database');

exports.addSession = ({testId, tutorId, userId, date, duration}, callback) => {
    let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date) values (${testId}, ${tutorId}, ${userId}, ${date})`

    db.query(queryStr, (err, result) => {
        if(err) {
            console.log('Error initializin session');
        } else {
            callback(result);
        }
    });
};

exports.deleteSession = ({sessionId}, callback) => {
    let queryStr = `DELETE FROM sessions WHERE id = ${sessionId}`;
    db.query(queryStr, (err, result) => {
        if(err) {
            console.log(`Error deleting ${sessionId} from the database`);
        } else {
            callback(result);
        }
    });
};

exports.updateSession = () => {

};

exports.getSession = (id, callback) => {
    // still need to decide whether to sort 
    // need name field tutors table
    let queryStr = `SELECT * FROM sessions JOIN tutors ON sessions.tutor_id = tutors.id WHERE student_id = ${id} ORDER BY date DESC`;
    db.query(queryStr, callback);
};

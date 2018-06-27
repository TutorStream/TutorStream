const db = require('./../../database');

<<<<<<< HEAD
exports.bookSessionDB = ({testId, tutorId, userId, date, duration}, callback) => {
=======
const bookSessionDB = ({testId, tutorId, userId, date, duration}, callback) => {
>>>>>>> dev
    let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date) values (${testId}, ${tutorId}, ${userId}, ${date})`

    db.query(queryStr, (err, result) => {
        if(err) {
            console.log('Error initializin session');
        } else {
            callback(result);
        }
    });
};

exports.deleteSessionDB = ({sessionId}, callback) => {
    let queryStr = `DELETE FROM sessions WHERE id = ${sessionId}`
    db.squery(queryStr, (err, result) => {
        if(err) {
            console.log(`Error deleting ${sessionId} from the database`);
        } else {
            callback(result)
<<<<<<< HEAD
     }
    });
=======
        }
    })
}

const getSessionDB = (id, callback) => {
    // still need to decide whether to sort 
    // need name field tutors table
    let queryStr = `SELECT * FROM sessions JOIN tutors ON sessions.tutor_id = tutors.id WHERE student_id = ${id} ORDER BY date DESC`
    db.query(queryStr, (err, result) => {
        if(err) {
            console.log(`Error retrieving sessions for ${sessionId}`)
        } else {
            callback(result)
        }
    })
}

module.exports =  {
    bookSessionDB,
    deleteSessionDB
>>>>>>> dev
};

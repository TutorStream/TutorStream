const {connection:{query}} = require('./../../database/connection')

const {connection} = require('./../../database/connection')

console.log(connection)

const bookSessionDB = ({testId, tutorId, userId, date, duration}, callback) => {
    let queryStr = `INSERT INTO sessions (test_id, tutor_id, student_id, date) values (${testId}, ${tutorId}, ${userId}, ${date})`

    query(queryStr, (err, result) => {
        if(err) {
            console.log('Error initializin session')
        } else {
            callback(result)
        }
    })
}

const deleteSessionDB = ({sessionId}, callback) => {
    let queryStr = `DELETE FROM sessions WHERE id = ${sessionId}`
    query(queryStr, (err, result) => {
        if(err) {
            console.log(`Error deleting ${sessionId} from the database`)
        } else {
            callback(result)
        }
    })
}

module.exports = {
    bookSessionDB,
    deleteSessionDB
}
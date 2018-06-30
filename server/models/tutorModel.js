const db = require('./../../database');

//pass in callback and optional testID -- if no testID is passed in, testID defaults to null
exports.getTopTutors = (callback, test_id = null) => {
  let queryStr = '';
  if (test_id === null) {
    queryStr = 'SELECT * FROM tutors ORDER BY Rating DESC';
  } else {
    queryStr = `SELECT * FROM tutors WHERE ID IN (SELECT tutor_id FROM tutor_tests WHERE test_id = ${test_id}) ORDER BY Rating DESC`;
  }
  db.query(queryStr, callback);
};

//pass in tutor_id and callback
exports.getTutorInfo = (tutor_id, callback) => {
  let queryStr = `SELECT * FROM tutors WHERE ID = ${tutor_id}`;
  db.query(queryStr, callback);
};

//pass in tutor_id and callback, sends back array of objects
exports.getTutorTests = (tutor_id, callback) => {
  let queryStr = `SELECT test_id FROM tutor_tests WHERE tutor_id = ${tutor_id}`;
  db.query(queryStr, callback);
};

//check if tutor profile exists & add or update accordingly
exports.addOrUpdateTutor = (params, callback) => {
  let initialQuery = `SELECT * FROM tutors WHERE ID = ${params.id}`;
  db.query(initialQuery, (err, result) => {
    if (err) {
      console.error('There was an error retrieving the tutor from the database: ', err);
    } else {
      //if tutor profile doesn't exist, add new tutor
      if (result.length === 0) {
        let queryStr = 'INSERT INTO tutors (ID, Bio, Price) VALUES ?';
        db.query(queryStr, [ params.id, params.bio, params.price ], (err, result) => {
          if (err) {
            console.error('There was an error adding a new tutor to the database: ', err);
          } else {
            //update tutor status in users table
            let queryStr2 = `UPDATE users SET Tutor = 1 WHERE ID = ${params.id}`;
            db.query(queryStr2, (err, result) => {
              if (err) {
                console.error('There was an error updating the user\'s tutor field: ', err);
              } else {
                // add tutor-able tests to tutor_tests database
                let queryStr3 = 'INSERT INTO tutor_tests (tutor_id, test_id) VALUES ?';
                // assuming input's params.tests is an array of arrays in format [ [tutor_id, test_id], [tutor_id, test2_id] ]
                // this is the array of tests the tutor can teach
                db.query(queryStr3, params.tests, callback);
              }
            });
          }
        });
      } else {
      //if the tutor profile exists, update user's tutor profile info
        let updateStr = `UPDATE tutors SET Bio = ?, Price = ? WHERE ID = ${params.id}`;
        db.query(updateStr, [ params.bio, params.price ], (err, result) => {
          if (err) {
            console.error('There was an error updating the tutor bio: ', err);
          } else {
            let deleteOldTest = `DELETE FROM tutor_tests WHERE tutor_id = ${params.id}`;
            db.query(deleteOldTest, (err, result) => {
              if (err) {
                console.error('There was an error deleting the tests: ', err);
              } else {
                let testUpdateStr = `INSERT INTO tutor_tests (tutor_id, test_id) VALUES ?`;
                db.query(testUpdateStr, params.tests, callback);
              }
            });
          }
        });
      }
    }
  });
};

//add rating and feedback 
exports.addFeedback = (params, callback) => {
  let queryStr = `INSERT INTO feedback (user_id, tutor_id, rating, content, date, time) VALUES ?`;
  db.query(queryStr, [ params.user_id, params.tutor_id, params.rating, params.content, params.date, params.time ], callback);
};

exports.getFeedback = (tutor_id, callback) => {
  let queryStr = `SELECT * FROM feedback WHERE tutor_id = ${tutor_id}`;
  db.query(queryStr, callback);
};
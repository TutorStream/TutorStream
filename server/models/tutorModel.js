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
  console.log('params', params)
  let initialQuery = `SELECT * FROM tutors WHERE ID = ${params.user_id}`;
  db.query(initialQuery, (err, result) => {
    if (err) {//probably need to switch logic so if err; means user doesnt exist in tutors table
      console.error('There was an error retrieving the tutor from the database: ', err);
    } else {
      //if tutor profile doesn't exist, add new tutor
      console.log('Info that got here : ', params)
      if (result.length === 0) {
        let queryStr = 'INSERT INTO tutors (ID, Name, Bio, Price) VALUES (?,?,?,?)';
        db.query(queryStr, [ params.user_id, params.name, params.bio, params.rate ], (err, result) => {
          if (err) {
            console.error('There was an error adding a new tutor to the database: ', err);
          } else {
            //update tutor status in users table
            let queryStr2 = `UPDATE users SET Tutor = 1 WHERE ID = ${params.user_id}`;
            db.query(queryStr2, (err, result) => {
              if (err) {
                console.error('There was an error updating the user\'s tutor field: ', err);
              } else {
                // add tutor-able tests to tutor_tests database
                // MAKE PROMISES ARRAY;
                var promises = [];
                params.tests.forEach((test)=>{
                  let queryStr3 = 'INSERT INTO tutor_tests (tutor_id, test_id) VALUES (?,?)';
                  // assuming input's params.tests is an array of arrays in format [ [tutor_id, test_id], [tutor_id, test2_id] ]
                  // this is the array of tests the tutor can teach
                  db.query(queryStr3, [test.tutor_id, test.test_id], (err, result) => {
                    // PUSH A NEWLY CREATED PROMISE TO THE PROMISES ARRAY
                    promises.push(new Promise((resolve,reject)=>{
                     if(err) reject(err);
                     resolve(result); 
                    }))
                    // THAT RESOLVES WITH THE RESULT
                  });
                  // PROMISE.ALL WITH THE ARRAY OF PROMISES             
                })
                Promise.all(promises).then(()=>callback()).catch((err)=>callback(err))
               

              }
            });
          }
        });
      } else {
      //if the tutor profile exists, update user's tutor profile info
        let updateStr = `UPDATE tutors SET Bio = ?, Price = ? WHERE ID = ${params.user_id}`;
        db.query(updateStr, [ params.bio, params.rate ], (err, result) => {
          if (err) {
            console.error('There was an error updating the tutor bio: ', err);
          } else {
            let deleteOldTest = `DELETE FROM tutor_tests WHERE tutor_id = ${params.user_id}`;
            db.query(deleteOldTest, (err, result) => {
              if (err) {
                console.error('There was an error deleting the tests: ', err);
              } else {

                var promises = [];
                params.tests.forEach((test)=>{
                  let testUpdateStr = `INSERT INTO tutor_tests (tutor_id, test_id) VALUES (?,?)`;
                  // assuming input's params.tests is an array of arrays in format [ [tutor_id, test_id], [tutor_id, test2_id] ]
                  // this is the array of tests the tutor can teach
                  db.query(testUpdateStr, [test.tutor_id, test.test_id], (err, result) => {
                    console.log('inserting in tables..')
                    // PUSH A NEWLY CREATED PROMISE TO THE PROMISES ARRAY
                    promises.push(new Promise((resolve,reject)=>{
                     if(err) reject(err);
                     resolve(result); 
                    }))
                    // THAT RESOLVES WITH THE RESULT
                  });
                  // PROMISE.ALL WITH THE ARRAY OF PROMISES             
                })
                Promise.all(promises).then(()=>callback()).catch((err)=>callback(err))
               
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
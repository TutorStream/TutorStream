const db = require('./../../database');

exports.getTopTutors = (callback, test_id = null) => {
  let queryStr = '';
  if (test_id === null) {
    queryStr = 'SELECT * FROM tutors ORDER BY Rating DESC';
  } else {
    queryStr = `SELECT * FROM tutors WHERE id IN (SELECT tutor_id FROM tutor_tests WHERE test_id = ${test_id}) ORDER BY Rating DESC`;
  }
  db.query(queryStr, callback);
};

exports.getTutorInfo = (tutor_id, callback) => {
  let queryStr = `SELECT * FROM tutors WHERE id = ${tutor_id}`;
  db.query(queryStr, callback);
};

exports.addOrUpdateTutor = (params, callback) => {
  let initialQuery = `SELECT * FROM tutors WHERE id = ${params.id}`;
  db.query(initialQuery, (err, result) => {
    if (err) {
      console.error(
        'There was an error retrieving the tutor from the database: ',
        err
      );
    } else {
      if (result.length === 0) {
        let queryStr =
          'INSERT INTO tutors (id, Name, Bio, Price) VALUES (?,?,?,?)';
        db.query(
          queryStr,
          [params.id, params.name, params.bio, params.rate],
          (err, result) => {
            if (err) {
              console.error(
                'There was an error adding a new tutor to the database: ',
                err
              );
            } else {
              let queryStr2 = `UPDATE users SET Tutor = 1 WHERE id = ${
                params.id
              }`;
              db.query(queryStr2, (err, result) => {
                if (err) {
                  console.error(
                    "There was an error updating the user's tutor field: ",
                    err
                  );
                } else {
                  var promises = [];
                  params.tests.forEach(test => {
                    let queryStr3 =
                      'INSERT INTO tutor_tests (tutor_id, test_id) VALUES (?,?)';
                    db.query(
                      queryStr3,
                      [test.tutor_id, test.test_id],
                      (err, result) => {
                        promises.push(
                          new Promise((resolve, reject) => {
                            if (err) reject(err);
                            resolve(result);
                          })
                        );
                      }
                    );
                  });
                  Promise.all(promises)
                    .then(() => callback())
                    .catch(err => callback(err));
                }
              });
            }
          }
        );
      } else {
        let updateStr = `UPDATE tutors SET Bio = ?, Price = ?, Name = ? WHERE id = ${
          params.id
        }`;
        db.query(
          updateStr,
          [params.bio, params.rate, params.name],
          (err, result) => {
            if (err) {
              console.error('There was an error updating the tutor bio: ', err);
            } else {
              let deleteOldTest = `DELETE FROM tutor_tests WHERE tutor_id = ${
                params.id
              }`;
              db.query(deleteOldTest, (err, result) => {
                if (err) {
                  console.error('There was an error deleting the tests: ', err);
                } else {
                  var promises = [];
                  params.tests.forEach(test => {
                    let testUpdateStr = `INSERT INTO tutor_tests (tutor_id, test_id) VALUES (?,?)`;
                    db.query(
                      testUpdateStr,
                      [test.tutor_id, test.test_id],
                      (err, result) => {
                        promises.push(
                          new Promise((resolve, reject) => {
                            if (err) reject(err);
                            resolve(result);
                          })
                        );
                      }
                    );
                  });
                  Promise.all(promises)
                    .then(() => callback())
                    .catch(err => callback(err));
                }
              });
            }
          }
        );
      }
    }
  });
};

exports.addFeedback = (params, callback) => {
  let queryStr = `INSERT INTO feedback (id, tutor_id, rating, content, date, time) VALUES ?`;
  db.query(
    queryStr,
    [
      params.id,
      params.tutor_id,
      params.rating,
      params.content,
      params.date,
      params.time
    ],
    callback
  );
};

exports.getTutorsPhotos = (idList, callback) => {
  let queryStr = `SELECT * FROM photos WHERE user_id IN (${idList})`;
  db.query(queryStr, callback);
};
const User = require('./../models/userModel');

exports.addNewUser = (req, res) => {
  // get new user firts
  // THEN add to user_tests
  console.log('req.body', req.body);
  User.addNewUser(req.body, (err, addedUserResults) => {
    if(err) {
      res.send(400);
    } else {
      console.log('what is coming back from DB', addedUserResults);
      User.addNewUserTests(req.body.tests, (err, addedTestsResults) => {
        if(err) {
          res.send(400);
        } else {
          res.send(201) // just send back successful creation
        }
      })
    }
  });
};

exports.loginUserCheck = (req, res) => {
  // eventually, this will just be checking for the existence of some authorization attached to HTTP request
  console.log('should be username and password on this obj, ', req.body)
  User.loginUser(req.body, (err, results) => {
    if(err) {
      res.send(400);
    } else {
      res.send(201) // just send back authentication? eventually, will send back token?
    }
  })
}; 

exports.getAllTutors = (req, res) => {
  // use testid to get all Tutors for a given test
  var testId = req.body.testId;
  User.getTopTutors((err, topTutors) => {
    if(err) {
      res.send(400);
    } else {
      res.send(topTutors);
    }
  }, testId);
;}


// already exporting each method, no need to export entire file
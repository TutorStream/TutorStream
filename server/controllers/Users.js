const User = require('./../models/userModel');
const Tutor = require('./../models/tutorModel');

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
          res.sendStatus(400);
        } else {
          res.sendStatus(201) // just send back successful creation
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
      res.sendStatus(400);
    } else {
      res.sendStatus(201) // just send back authentication? eventually, will send back token?
    }
  })
}; 

exports.getAllTutors = (req, res) => {
  // use testid to get all Tutors for a given test
  var testId = req.body.testId;
  Tutor.getTopTutors((err, topTutors) => {
    if(err) {
      res.sendStatus(400);
    } else {
      res.send(topTutors);
    }
  }, testId);
;}

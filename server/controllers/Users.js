const User = require('./../models/userModel');

exports.addNewUser = (req, res) => {
  // create new User
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const tests = req.body.tests // needs to be an array of arrays --> [user_id, test_id] // do on front end
  const 
  // user User model to add new test
  // send back new User info, and all relevant tests
};

exports.loginUserCheck = (req, res) => {
  // eventually, this will just be checking for the existence of some authorization attached to HTTP request
  var username = req.body.username;
  var password = req.body.password;
  // user User model DB helper to check for user
  // send back new user object
  // send back all relevnat tests for user dash rendering
  // KEY DISTINCTION --> User or Tutor
}; 

exports.getAllTutors = (req, res) => {
  // use testid to get all Tutors for a given test
  var testId = req.body.testId;
  var isTutor = true;  // automatically passed in ? just hard-code
  // use testId to query DB for all tutors of a particular test
  // send back ALL tutors for a given test for rendering by client
;}


// already exporting each method, no need to export entire file
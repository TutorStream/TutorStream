const User = require('./../models/userModel');
// const Tutor = require('./../models/tutorModel');

exports.addNewUser = (req, res) => {
  User.addNewUser(req.body, (err, addedUserResults) => {
    if(err) {
      res.status(400).send(err);
    } else {
      req.body.tests.map((testId) => {
        User.addNewUserTests(addedUserResults.insertId, testId, (err, result) => {
          if(err) {
            console.error(err);
          }
        });
      });
      res.status(201).send();
    }
  });
};

exports.loginUserCheck = (req, res) => {
  // eventually, this will just be checking for the existence of some authorization attached to HTTP request
  User.loginUser(req.body, (err, user) => {
    if(err) {
      console.log(err)
    } else {
      var ID = user[0] === undefined ? 0 : user[0].ID 
      res.send({ID});
    }
  });
}; 

exports.getUserInfo = (req, res) => {
  console.log(req.params.id)
  User.getUserInfoDB(req.params.id, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(user)
    }
  })
};
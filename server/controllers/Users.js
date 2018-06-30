const User = require('./../models/userModel');
const Tutor = require('./../models/tutorModel');

exports.addNewUser = (req, res) => {
  console.log('req.body', req.body);
  User.addNewUser(req.body, (err, addedUserResults) => {
    if(err) {
      res.status(400).send(err);
    } else {
      console.log('req.body.Tests', req.body.tests);
      console.log('what is coming back from DB', addedUserResults);
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
}

exports.getTutors = (req, res) => {
  Tutor.getTopTutors((err, topTutors) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(topTutors);
    }
  }, req.query.test_id);
};

exports.getTutorProfile = (req, res) => {
  Tutor.getTutorInfo(req.params.id,(err, results) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(results);
    }
  });
};


const User = require('./../models/userModel');
const Tutor = require('./../models/tutorModel');

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
      res.status(201).send(`${addedUserResults.insertId}`);
    }
  });
};

exports.loginUserCheck = (req, res) => {
  // eventually, this will just be checking for the existence of some authorization attached to HTTP request
  User.loginUser(req.body, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      var ID = user[0] === undefined ? 0 : user[0].ID;
      res.send({ID});
    }
  });
}; 

exports.getUserInfo = (req, res) => {
  User.getUserInfoDB(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(user);
    }
  });
};

exports.getUsernameById = (req, res) => {
  User.getUsernameById(req.params.id, (err, username) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(username);
    }
  });
};


exports.updateUser = (req,res)=> {
  User.updateUser(req.body,(err, results)=>{
    if(err) {
      res.sendStatus(400);
    } 
    if(req.body.isTutor){
        var newUpdates = {
          bio : req.body.tutorBio,
          rate: req.body.rate,
          id: req.body.id,
          tests: req.body.tests,
          name: req.body.name
        };
        Tutor.addOrUpdateTutor(newUpdates,(err, results) => {
          if(err) {
            res.sendStatus(400);
          } else {
            res.status(201).send('updated');
          }
        });
    } else {
      res.status(201).send('updated');
    }
  });
};

exports.addOrUpdateUserPhoto = (req, res) => {
  User.getPhoto(req.body.user_id, (err, result) => {
    if (err) {
      console.error('There was an error getting the photo to add to user photo', err);
    } else {
      if (result.length === 0) {
        User.addPhoto(req.body, (err, result) => {
          if (err) {
            console.error('There was an error adding the user\'s photo: ', err);
          } else {
            res.send(`The photo has been added! Here is the result: ${result}`);
          }
        });
      } else {
        User.updatePhoto(req.body, (err, result) => {
          if (err) {
            console.error('There was an error updating the user\'s photo: ', err);
          } else {
            res.send(`The photo has been updated! Here is the result: ${result}`);
          }
        });
      }
    }
  });
};

exports.getUserPhoto = (req, res) => {
  User.getPhoto(req.query.user_id, (err, result) => {
    if (err) {
      console.error('There was an error getting the user photo: ', err);
    } else {
      res.send(result);
    }
  });
};
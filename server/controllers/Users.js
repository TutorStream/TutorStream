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

exports.addOrUpdateTutor = (req, res) => {
  console.log('We got here req.params', req.body)
  var name;
  User.getUserInfoDB(req.body.id, (err, user) => {
    if (err) {
      console.log('oh shit',err)
    } else {
      name = user[0].Name 
      var newForm = Object.assign({name}, req.body);
      console.log('About to update this>>>', newForm) 
      Tutor.addOrUpdateTutor(newForm,(err, results) => {
        if(err) {
          res.sendStatus(400);
        } else {
          res.status(201).send('updated');
        }
      });
    }
  })
};


exports.updateUser = (req,res)=> {
  console.log('I got to users to update, form : ', req.body)
  User.updateUser(req.body,(err,results)=>{
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
        }
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
  })
}


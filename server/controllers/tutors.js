const User = require('./../models/userModel');
const Tutor = require('./../models/tutorModel');

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
  console.log('we got here req.params', req.body)

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
const User = require('./../models/userModel');
const Tutor = require('./../models/tutorModel');
const Test = require('./../models/testModel');
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
    Test.getTutorTests(req.params.id,(err, data) => {
      if(err) {
        res.status(400).send(err);
      } else {
        // where to get the full test information from, like name? front or back end?
        let test_ids = [];
        data.forEach((test) => { test_ids.push(test.test_id); });
        Test.getTestInfo(test_ids, (err, result) => {
          if (err) {
            console.error('There was an error getting all test info: ', err);
          } else {
            let tests = { tests: result };
            let allResults = Object.assign(tests, results[0]);
            res.send(allResults);
          }
        });
      }
    });
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
}
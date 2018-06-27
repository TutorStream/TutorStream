const Test = require('./../models/testModel')
// const Tutor = require('./../models/tutorModel')

exports.getAllTests = (req, res) => {
  Test.getTests((err, tests) => {
    if(err) {
      res.sendStatus(400);
    } else {
      res.send(tests);
    }
  })
};

exports.testSearch = (req, res) => {
  const testName = req.query.testId;
  console.log('testName = req.query.testId ', testName);
  Test.selectTest(testName, (err, test) => {
    if(err) {
      res.sendStatus(400);
    } else {
      res.send(test); // OR get all tutors for that test?
    }
  })
};


// already exporting each method, no need to export entire file
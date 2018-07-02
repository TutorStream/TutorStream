const testModel = require('./../models/testModel');

exports.getAllTests = (req, res) => {
  // get all tests, nothing in req body, just run get all tests from DB helpers
  testModel.getTests((err, results) => {
    if (err) {
      console.error('There was an error getting all tests from the database: ', err);
    } else {
      res.send(results);
    }
  });
};

//expecting to receive test id as req.query.testid
exports.testSearch = (req, res) => {
  let testId = req.params.testId;
  testModel.selectTest(testId, (err, results) => {
    if (err) {
      console.error('There was an error selecting your specific test: ', err);
    } else {
      res.send(results);
    }
  });
};

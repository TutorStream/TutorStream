const testModel = require('./../models/testModel');

exports.getAllTests = (req, res) => {
  testModel.getTests((err, results) => {
    if (err) {
      console.error(
        'There was an error getting all tests from the database: ',
        err
      );
    } else {
      res.send(results);
    }
  });
};

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

// import Test model
const Test = require('./../../database/Test') // INSERT ACTUAL FILE NAME

exports.getAllTests = (req, res) => {
  // get all tests, nothing in req body, just run get all tests from DB helpers
};

exports.testSearch = (req, res) => {
  // testId (/ name??) will be part of query property of the axios.get request
  // in params 
  const testName = req.query.testId;
  // use test model to search for tests
  // send back specified list of tests  (array) to client
};

// already exporting each method, no need to export entire file
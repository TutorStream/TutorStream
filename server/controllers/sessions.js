// import Session model
// const Session = require('./../../database/Session') // INSERT ACTUAL FILE NAME

exports.bookSession = (req, res) => {
  const testId = req.body.testId;
  const userId = req.body.userId;
  const tutorId = req.body.tutorId;
  const date = req.body.date;
  const duration = req.body.duration;
  // use Session model to add a new session with tutor 
  // send back all requisite session info (id, test id, tutor id, userId, date, duration) to client
};

exports.deleteSession = (req, res) => {
  var sessionId = req.body.sessionId;
  // use session model to delete session
  // send back 201 to client
};

exports.changeSession = (req, res) => {
  var sessionId = req.body.sessionId;
  // use session model to update a session
  // send back 201 to  client
;}


// already exporting each method, no need to export entire file
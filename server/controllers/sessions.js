const sessionModel = require('./../models/sessionModel');

exports.bookSession = (req, res) => {
  sessionModel.addSession(req.body, (err, newSession) => {
    if(err) {
      console.error(err);
    } else {
      console.log('whats returning from DB : newSession?', newSession);
      res.send(newSession);
    }
  });
};

exports.deleteSession = (req, res) => {
  // use session model to delete session
  // send back 201 to client
  sessionModel.deleteSession(req.body, (err, result) => {
    if (err)  {
      console.log(err)
    } else {
      res.status(201).end()
    }
  })
};

exports.updateSession = (req, res) => {
  var sessionId = req.body
  // use session model to update a session
  // send back 201 to  client
};

exports.getSession = (req, res) => {
  let id = req.params.id;
  sessionModel.getSession(id, (err, result) => {
    if (err) {
      console.error('There was an error getting the session info: ', err);
    } else {
      res.send(result);
    }
  });

};
const sessionModel = require('./../models/sessionModel');

exports.bookSession = (req, res) => {
  sessionModel.addSession()
  // use Session model to add a new session with tutor 
  // send back all requisite session info (id, test id, tutor id, userId, date, duration) to client
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
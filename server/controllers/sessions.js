// import Session model
// const Session = require('./../../database/Session') // INSERT ACTUAL FILE NAME
const Session = require('./models/sessionModel')

exports.bookSession = (req, res) => {
  Session.bookSessionDB(req.body, (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.status(201).end()
    }
  })
  // use Session model to add a new session with tutor 
  // send back all requisite session info (id, test id, tutor id, userId, date, duration) to client
};

exports.deleteSession = (req, res) => {
  // use session model to delete session
  // send back 201 to client
  Session.deleteSessionDB(req.body, (err, result) => {
    if (err)  {
      console.log(err)
    } else {
      res.status(201).end()
    }
  })
};

exports.changeSession = (req, res) => {
  var sessionId = req.body
  // use session model to update a session
  // send back 201 to  client
;}


// already exporting each method, no need to export entire file
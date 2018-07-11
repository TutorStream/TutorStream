const sessionModel = require('./../models/sessionModel');

exports.bookSession = (req, res) => {
  console.log('rec.body for adding session : ',req.body)
  sessionModel.addSession(req.body, (err, newSession) => {
    if(err) {
      console.error(err);
    } else {
      console.log('whats returning from DB : newSession booked?', newSession);
      res.sendStatus(201);
    }
  });
};

exports.deleteSession = (req, res) => {
  console.log('req.params', req.params);
  sessionModel.deleteSession(req.params, (err, result) => {
    if (err)  {
      console.log(err)
    } else {
      res.status(201).end()
    }
  })
};

exports.updateSession = (req, res) => {
  console.log("We're here about to update session to complete",req.params.id)
  sessionModel.updateSession(req.params.id, (err, result) => {
    if (err) {
      console.error('There was an error getting the session info: ', err);
    } else {
      console.log('result is ??? oh Updated',result)
      res.status(201);
    }
  });
};

exports.getSession = (req, res) => {
  var form = {
    id : req.params.id,
    isTutor: Number(req.query.isTutor)
  };
  sessionModel.getSession(form, (err, result) => {
    if (err) {
      console.error('There was an error getting the session info: ', err);
    } else {
      console.log('result is ??? ',result)
      res.send(result);
    }
  });

};
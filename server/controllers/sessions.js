const sessionModel = require('./../models/sessionModel');

exports.bookSession = (req, res) => {
  sessionModel.addSession(req.body, (err, newSession) => {
    if (err) {
      console.error(err);
    } else {
      res.sendStatus(201);
    }
  });
};

exports.deleteSession = (req, res) => {
  sessionModel.deleteSession(req.params, (err, result) => {
    if (err) {
      console.error('Error deleting session from database', err);
    } else {
      res.status(201).end();
    }
  });
};

exports.updateSession = (req, res) => {
  sessionModel.updateSession(req.params.id, (err, result) => {
    if (err) {
      console.error('There was an error getting the session info: ', err);
    } else {
      res.status(201);
    }
  });
};

exports.getSession = (req, res) => {
  console.log('istutor:', req.query.isTutor);
  var form = {
    id: req.params.id,
    isTutor: Number(req.query.isTutor)
  };
  console.log('what ist he form: ', form);
  sessionModel.getSession(form, (err, result) => {
    if (err) {
      console.error('There was an error getting the session info: ', err);
    } else {
      console.log('insider getSession: ', result);
      res.send(result);
    }
  });
};

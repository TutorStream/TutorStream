const Earnings = require('./../models/earningsModel');



exports.addEarnings = (req, res) => {

  console.log('req.body should for adding earnings', req.body);
  Earnings.addEarnings(req.body, (err, newEarnings) => {
    if (err) {
      console.log('big problem!!!!!!!!', err)
      res.sendStatus(400);
    } else {
      console.log('added!!')
      res.send(201);
    }
  });
};

exports.updateEarnings = (req, res) => {
  // need ID, id, tutor_id, rating, content, date, time
  console.log('req.body should have rating and content', req.body);
  Earnings.updateEarnings(req.body, (err, updatedEarnings) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(202);
    }
  });
};

exports.getEarnings = (req, res) => {
  Earnings.getEarnings(req.params, (err, earnings) => {
    if (err) {
      res.status(400).send(`Error getting earnings for ${req.params.id}`);
    } else {
      res.status(202).send(earnings);
    }
  });
};

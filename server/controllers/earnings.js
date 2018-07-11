const Earnings = require('./../models/earningsModel');



exports.getEarnings = (req, res) => {

  console.log('req.body for adding earnings', req.params);


  Earnings.getEarnings(req.params.id, (err, newEarnings) => {
    if (err) {
      console.log('big problem!!!!!!!!', err)
      res.sendStatus(400);
    } else {
      console.log('new Earnings', newEarnings)
      res.send(newEarnings);
    }
  });
};

exports.updateEarnings = (req, res) => {
  // need id, id, tutor_id, rating, content, date, time
  console.log('req.body should have rating and content', req.body);
  Earnings.updateEarnings(req.body, (err, updatedEarnings) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(202);
    }
  });
};

exports.addEarnings = (req, res) => {
  Earnings.addEarnings(req.params, (err, earnings) => {
    if (err) {
      res.status(400).send(`Error adding earnings for ${req.params.id}`);
    } else {
      res.status(202).send(earnings);
    }
  });
};

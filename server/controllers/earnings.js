const Earnings = require('./../models/earningsModel');

exports.getEarnings = (req, res) => {
  Earnings.getEarnings(req.params.id, (err, newEarnings) => {
    if (err) {
      console.error(err);
      res.sendStatus(400);
    } else {
      res.send(newEarnings);
    }
  });
};

exports.updateEarnings = (req, res) => {
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

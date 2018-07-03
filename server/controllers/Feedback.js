const Feedback = require('./../models/feedbackModel');

exports.addFeedback = (req, res) => {
   // need ID, id, tutor_id, rating, content, date, time
   console.log('req.body should have all 5 necessary shcema columsn', req.body);
   Feedback.addFeedback(req.body, (err, newFeedback) => {
    if (err) {
      res.sendStatus(400);
    } else {
        res.send(201);
    }
   });
};

exports.updateFeedback = (req, res) => {
   // need ID, id, tutor_id, rating, content, date, time
   console.log('req.body should have rating and content', req.body);
   Feedback.updateFeedback(req.body, (err, updatedFeedback) => {
     if(err) {
        res.sendStatus(400);  
     } else {
         res.sendStatus(202);
     }
   });
};

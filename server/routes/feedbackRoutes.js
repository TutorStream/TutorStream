const feedbackRouter = require('express').Router();
const feedbackControllers = require('./../controllers/feedback');

// router.post('/feedback', feedbackControllers.addFeedback);
feedbackRouter.post('/', feedbackControllers.addFeedback);

// router.put('/feedback/updateFeedback', feedbackControllers.updateFeedback);
feedbackRouter.put('/updateFeedback', feedbackControllers.updateFeedback);


module.exports = feedbackRouter;
const feedbackRouter = require('express').Router();
const feedbackController = require('./../controllers/feedback');

// router.post('/feedback', feedbackControllers.addFeedback);
feedbackRouter.post('/:id', feedbackController.addFeedback);

// router.put('/feedback/updateFeedback', feedbackControllers.updateFeedback);
feedbackRouter.put('/:id', feedbackController.updateFeedback);

feedbackRouter.get('/:id', feedbackController.getFeedback);

module.exports = feedbackRouter;

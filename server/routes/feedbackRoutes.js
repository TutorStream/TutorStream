const feedbackRouter = require('express').Router();
const feedbackController = require('./../controllers/feedback');

feedbackRouter.post('/:id', feedbackController.addFeedback);

feedbackRouter.put('/:id', feedbackController.updateFeedback);

feedbackRouter.get('/:id', feedbackController.getFeedback);

module.exports = feedbackRouter;

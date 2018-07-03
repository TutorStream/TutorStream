const testsRouter = require('express').Router();
const testsControllers = require('./../controllers/tests');

// router.get('/tests', testsControllers.getAllTests);
testsRouter.get('/', testsControllers.getAllTests);

// router.get('/tests/:testId', testsControllers.testSearch);
testsRouter.get('/:testId', testsControllers.testSearch);

module.exports = testsRouter;

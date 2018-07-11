const testsRouter = require('express').Router();
const testsControllers = require('./../controllers/tests');

testsRouter.get('/', testsControllers.getAllTests);

testsRouter.get('/:testId', testsControllers.testSearch);


module.exports = testsRouter;
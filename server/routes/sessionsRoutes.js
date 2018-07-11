const sessionsRouter = require('express').Router();
const sessionControllers = require('./../controllers/sessions');

sessionsRouter.post('/', sessionControllers.bookSession);

sessionsRouter.delete('/:id', sessionControllers.deleteSession);

sessionsRouter.put('/:id', sessionControllers.updateSession);

sessionsRouter.get('/:id', sessionControllers.getSession);


module.exports = sessionsRouter;
const sessionsRouter = require('express').Router();
const sessionControllers = require('./../controllers/sessions');

// sessionsRouter.post('/sessions', sessionControllers.bookSession);
sessionsRouter.post('/', sessionControllers.bookSession);

// sessionsRouter.delete('/sessions/:id', sessionControllers.deleteSession);
sessionsRouter.delete('/:id', sessionControllers.deleteSession);

// sessionsRouter.put('/sessions', sessionControllers.updateSession);
sessionsRouter.put('/', sessionControllers.updateSession);

// sessionsRouter.get('/sessions/:id', sessionControllers.getSession);
sessionsRouter.get('/:id', sessionControllers.getSession);


module.exports = sessionsRouter;
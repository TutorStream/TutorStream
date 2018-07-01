const sessionsRouter = require('express').Router();
const sessionControllers = require('./controllers/sessions');

router.post('/sessions', sessionControllers.bookSession);

router.delete('/sessions/:id', sessionControllers.deleteSession);

router.put('/sessions', sessionControllers.updateSession);

router.get('/sessions/:id', sessionControllers.getSession);


module.exports = sessionsRouter;
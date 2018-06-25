const router = require('express').Router();
// all controller files
const signupControllers = require('./controllers/Users');
const testsControllers = require('./controllers/tests');
const sessionControllers = require('./controllers/sessions');

// USERS

router.post('/signup', signupControllers.addNewUser);

router.get('/login', loginControllers.loginUserCheck);

// TESTS

router.get('/tests', testsControllers.getAllTests);

router.get('/tests/:testId', testsControllers.testSearch);

// SESSIONS

router.post('/sessions', sessionControllers.bookSession);

router.delete('/sessions', sessionControllers.deleteSession);

router.put('/sessions', sessionControllers.deleteSession);


module.exports = router;
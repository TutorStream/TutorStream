const router = require('express').Router();
// all controller files
const usersControllers = require('./controllers/Users');
const testsControllers = require('./controllers/tests');
const sessionControllers = require('./controllers/sessions');

// USERS

router.post('/users/signup', usersControllers.addNewUser);

router.get('/users/login', usersControllers.loginUserCheck);

router.get('/users/tutors', usersControllers.getAllTutors);


// TESTS

router.get('/tests', testsControllers.getAllTests);

router.get('/tests/:testId', testsControllers.testSearch);

// SESSIONS

router.post('/sessions', sessionControllers.bookSession);

router.delete('/sessions', sessionControllers.deleteSession);

router.put('/sessions', sessionControllers.deleteSession);


module.exports = router;
const router = require('express').Router();
// all controller files
const usersControllers = require('./controllers/users');
const testsControllers = require('./controllers/tests');
const sessionControllers = require('./controllers/sessions');
const videoChatControllers = require('./controllers/videoChat');
const feedbackControllers = require('./controllers/feedback');

// USERS

router.post('/users/signup', usersControllers.addNewUser);

router.post('/users/login', usersControllers.loginUserCheck);

router.get('/users/tutors', usersControllers.getAllTutors);

router.get('/users/tests', usersControllers.getUserTests);

// TESTS
//ok
router.get('/tests', testsControllers.getAllTests);
//ok
router.get('/tests/:testId', testsControllers.testSearch);

// SESSIONS

router.post('/sessions', sessionControllers.bookSession);

router.delete('/sessions/:id', sessionControllers.deleteSession);

router.put('/sessions', sessionControllers.updateSession);
//
router.get('/sessions/:id', sessionControllers.getSession);

// VIDEOCHAT

// get Twilio  APIkey
// router.get('/videoChat')

// other twilio server-reqs

// FEEDBACK

router.post('/feedback', feedbackControllers.addFeedback);

router.put('/updateFeedback', feedbackControllers.updateFeedback);


module.exports = router;
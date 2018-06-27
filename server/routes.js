const router = require('express').Router();
// all controller files
const usersControllers = require('./controllers/Users');
const testsControllers = require('./controllers/Tests');
const sessionControllers = require('./controllers/Sessions');
const videoChatControllers = require('./controllers/VideoChat');
const feedbackControllers = require('./controllers/Feedback');

// USERS

router.post('/users/signup', usersControllers.addNewUser);

router.post('/users/login', usersControllers.loginUserCheck);

router.get('/users/tutors', usersControllers.getAllTutors);

// TESTS

router.get('/tests', testsControllers.getAllTests);

router.get('/tests/:testId', testsControllers.testSearch);

// SESSIONS

router.post('/sessions', sessionControllers.bookSession);

router.delete('/sessions', sessionControllers.deleteSession);

router.put('/sessions', sessionControllers.deleteSession);

router.get('/sessions', sessionControllers.getSession)

// VIDEOCHAT

// get Twilio  APIkey
// router.get('/videoChat')

// other twilio server-reqs

// FEEDBACK

router.post('/feedback', feedbackControllers.addFeedback);

router.put('/updateFeedback', feedbackControllers.updateFeedback);


module.exports = router;
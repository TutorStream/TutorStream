const router = require('express').Router();

const usersControllers = require('./controllers/users.js');
const testsControllers = require('./controllers/tests');
const sessionControllers = require('./controllers/sessions');
const videoChatControllers = require('./controllers/videochat');
const feedbackControllers = require('./controllers/feedback');


router.post('/users/signup', usersControllers.addNewUser);

router.post('/users/login', usersControllers.loginUserCheck);

router.get('/users/info/:id', usersControllers.getUserInfo)

router.get('/users/tutors', usersControllers.getAllTutors);

// TUTORS

router.get('/tutors/:id', usersControllers.getTutorProfile);

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
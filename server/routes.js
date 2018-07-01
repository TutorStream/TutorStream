const router = require('express').Router();

const usersControllers = require('./controllers/users');
// const tutorsControllers = require('./controllers/tutors');
const testsControllers = require('./controllers/tests');
const sessionControllers = require('./controllers/sessions');
const feedbackControllers = require('./controllers/feedback');


router.post('/users/signup', usersControllers.addNewUser);

router.post('/users/login', usersControllers.loginUserCheck);

router.get('/users/info/:id', usersControllers.getUserInfo);

router.get('/tutors', usersControllers.getTutors);

router.get('/tutors/selectTutors', usersControllers.getTutors)

// TUTORS

router.get('/tutors/:id', usersControllers.getTutorProfile);

router.post('/tutors/:id', usersControllers.addOrUpdateTutor);

// TESTS

router.get('/tests', testsControllers.getAllTests);

router.get('/tests/:testId', testsControllers.testSearch);

// SESSIONS

router.post('/sessions', sessionControllers.bookSession);

router.delete('/sessions/:id', sessionControllers.deleteSession);

router.put('/sessions', sessionControllers.updateSession);

router.get('/sessions/:id', sessionControllers.getSession);

// FEEDBACK

// router.post('/feedback', feedbackControllers.addFeedback);

// router.put('/feedback/updateFeedback', feedbackControllers.updateFeedback);

// VIDEOCHAT

// get Twilio  APIkey
// router.get('/videoChat')

// other twilio server-reqs


module.exports = router;
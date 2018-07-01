const tutorsRouter = require('express').Router();
// const usersControllers = require('./../controllers/users');
const tutorsControllers = require('./../controllers/tutors');

// tutorsRouter.get('/tutors', usersControllers.getTutors);
tutorsRouter.get('/', tutorsControllers.getTutors);

// tutorsRouter.get('/tutors/selectTutors', usersControllers.getTutors);
tutorsRouter.get('/selectTutors', tutorsControllers.getTutors);

// tutorsRouter.get('/tutors/:id', usersControllers.getTutorProfile);
tutorsRouter.get('/:id', tutorsControllers.getTutorProfile);

// tutorsRouter.post('/tutors/:id', usersControllers.addOrUpdateTutor);
tutorsRouter.post('/:id', tutorsControllers.addOrUpdateTutor);


module.exports = tutorsRouter;
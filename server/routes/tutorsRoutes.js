const tutorsRouter = require('express').Router();
const tutorsControllers = require('./controllers/tutors');

tutorsRouter.get('/tutors', usersControllers.getTutors);

tutorsRouter.get('/tutors/selectTutors', usersControllers.getTutors)

tutorsRouter.get('/tutors/:id', usersControllers.getTutorProfile);

tutorsRouter.post('/tutors/:id', usersControllers.addOrUpdateTutor);


module.exports = tutorsRouter;
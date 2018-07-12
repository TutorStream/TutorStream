const tutorsRouter = require('express').Router();
const tutorsControllers = require('./../controllers/tutors');

tutorsRouter.get('/', tutorsControllers.getTutors);

tutorsRouter.get('/selectTutors', tutorsControllers.getTutors);

tutorsRouter.get('/photo', tutorsControllers.getTopTutorPhotos);

tutorsRouter.get('/:id', tutorsControllers.getTutorProfile);

tutorsRouter.post('/:id', tutorsControllers.addOrUpdateTutor);


module.exports = tutorsRouter;
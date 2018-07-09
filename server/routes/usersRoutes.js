const usersRouter = require('express').Router();
const usersControllers = require('./../controllers/users');

usersRouter.post('/signup', usersControllers.addNewUser);

usersRouter.post('/login', usersControllers.loginUserCheck);

usersRouter.post('/:id', usersControllers.updateUser);

usersRouter.get('/info/:id', usersControllers.getUserInfo);

usersRouter.get('/username/:id', usersControllers.getUsernameById);

usersRouter.post('/photo', usersControllers.addOrUpdateUserPhoto);

usersRouter.get('/photo', usersControllers.getUserPhoto);

module.exports = usersRouter;

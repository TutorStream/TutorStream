const usersRouter = require('express').Router();
const usersControllers = require('./../controllers/users');

// usersRouter.post('/users/signup', usersControllers.addNewUser);
usersRouter.post('/signup', usersControllers.addNewUser);

// usersRouter.post('/users/login', usersControllers.loginUserCheck);
usersRouter.post('/login', usersControllers.loginUserCheck);

usersRouter.post('/:id', usersControllers.updateUser);

// usersRouter.get('/users/info/:id', usersControllers.getUserInfo);
usersRouter.get('/info/:id', usersControllers.getUserInfo);

usersRouter.get('/username/:id', usersControllers.getUsernameById);

module.exports = usersRouter;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require ('./../database');

// const router = require('./routes');
const usersRouter = require('./routes/usersRoutes');
const tutorsRouter = require('./routes/tutorsRoutes');
const testsRouter = require('./routes/testsRoutes');
const sessionsRouter = require('./routes/sessionsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const router = express.Router()
const passport = require('passport')
const passportSetup = require('./config/passport_setup.js')

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/dist')));

/* Google authentication */
// auth login
router.get('/login', (req, res) => {
  res.send('login')
})
// auth logout
router.get('/logout', (req, res) => {
  res.send('logging out')
})
// auth with google
router.get('/google', passport.authenticate('google',{
  scope:['profile']
}))

// callback route for google to redirect
router.get('/auth/google/redirect', passport.authenticate('google') ,(req, res) => {
  res.send('You reached the response URI')
})



app.use(router)
// app.use('/', router);
app.use('/users', usersRouter);
app.use('/tutors', tutorsRouter);
app.use('/tests', testsRouter);
app.use('/sessions', sessionsRouter);
// app.use('/feedback', feedbackRouter);


app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

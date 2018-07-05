const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./../database');

// const router = require('./routes');
const usersRouter = require('./routes/usersRoutes');
const tutorsRouter = require('./routes/tutorsRoutes');
const testsRouter = require('./routes/testsRoutes');
const sessionsRouter = require('./routes/sessionsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./config/passport_setup.js');
// const cookieSession = require('cookie-session')

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/dist')));

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys:['tutorstreamcookiekey']
// }))

// // initialize passport

// app.use(passport.initialize())
// app.use(passport.session)

/* Google authentication */
// auth login
router.get('/login', (req, res) => {
  res.send('login');
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
});

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/calendar']
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google'), // complete the authenticate using the google strategy
  (err, req, res, next) => {
    // custom error handler to catch any errors, such as TokenError
    if (err.name === 'TokenError') {
      res.redirect('/'); // redirect them back to the login page
    } else {
      // Handle other errors here
      res.redirect('/');
    }
  },
  (req, res) => {
    // On success, redirect back to '/'
    res.redirect('/');
  }
);

app.use(router);
// app.use('/', router);
app.use('/users', usersRouter);
app.use('/tutors', tutorsRouter);
app.use('/tests', testsRouter);
app.use('/sessions', sessionsRouter);
app.use('/feedback', feedbackRouter);

app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

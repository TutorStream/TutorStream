const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require ('./../database');

// socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server); // CREATES our socketIO using the instance of the server


// const router = require('./routes');
const usersRouter = require('./routes/usersRoutes');
const tutorsRouter = require('./routes/tutorsRoutes');
const testsRouter = require('./routes/testsRoutes');
const sessionsRouter = require('./routes/sessionsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const router = express.Router()
const passport = require('passport')
const passportSetup = require('./config/passport_setup.js')
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
  req.logout()
  res.redirect('/')
});

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/calendar']
}));

router.get('/auth/google/redirect',
  passport.authenticate('google'), // complete the authenticate using the google strategy
  (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
    if (err.name === 'TokenError') {
     res.redirect('/'); // redirect them back to the login page
    } else {
     // Handle other errors here
     res.redirect('/')
    }
  },
  (req, res) => { // On success, redirect back to '/'
    res.redirect('/');
  }
);


app.use(router)
// app.use('/', router);
app.use('/users', usersRouter);
app.use('/tutors', tutorsRouter);
app.use('/tests', testsRouter);
app.use('/sessions', sessionsRouter);
// app.use('/feedback', feedbackRouter);


// socket.io listening

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('new-message', (msg) => {
    console.log('new message: ' + msg.message);
    // socket.broadcast.emit(msg.message); // emit messages to all OTHER users
    socket.broadcast.emit('sending-back', msg);
  })
  socket.on('disconnect', () => {
    console.log('user peaced out')
  })
});

server.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});


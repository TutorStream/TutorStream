const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./../database');
const compression = require('compression');


// socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server); // CREATES our socketIO using the instance of the server


// const router = require('./routes');
const usersRouter = require('./routes/usersRoutes');
const tutorsRouter = require('./routes/tutorsRoutes');
const testsRouter = require('./routes/testsRoutes');
const sessionsRouter = require('./routes/sessionsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const earningsRouter = require('./routes/earningsRoutes');
// const router = express.Router();
// const passport = require('passport');
// const passportSetup = require('./config/passport_setup.js');
// const cookieSession = require('cookie-session')

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

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
// router.get('/login', (req, res) => {
//   res.send('login');
// });

// auth logout
// router.get('/logout', (req, res) => {
//   // handle with passport
//   req.logout();
//   res.redirect('/');
// });

// auth with google+
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'https://www.googleapis.com/auth/calendar']
//   })
// );

// router.get(
//   '/auth/google/redirect',
//   passport.authenticate('google'), // complete the authenticate using the google strategy
//   (err, req, res, next) => {
//     // custom error handler to catch any errors, such as TokenError
//     if (err.name === 'TokenError') {
//       res.redirect('/'); // redirect them back to the login page
//     } else {
//       // Handle other errors here
//       res.redirect('/');
//     }
//   },
//   (req, res) => {
//     // On success, redirect back to '/'
//     res.redirect('/');
//   }
// );

// app.use(router);
// app.use('/', router);
app.use('/users', usersRouter);
app.use('/tutors', tutorsRouter);
app.use('/tests', testsRouter);
app.use('/sessions', sessionsRouter);
app.use('/feedback', feedbackRouter);

// socket.io listening

io.on('connection', (socket) => {
  console.log('user connected');
  var room;
  socket.on('room', (data) => {
      console.log('data :', data);
      room = data.room;
      socket.join(data.room)
  })
  socket.on('new-message', (msg) => {
    console.log('new message: ' + msg.message);
    console.log('room ', msg.room);
    socket.broadcast.to(msg.room).emit('sending-back', msg); // emit messages to all OTHER users
  })
  // socket.on('leaving-room', (data) => {
  //   console.log('what room is being left ', data.room);
  //   socket.leave(data.room, () => {
  //     console.log('successfully left room');
  //   })
  // })
  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.leave(room, () => {
      console.log('successfully left room');
    })
  })
});


server.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});


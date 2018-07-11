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

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  return compression.filter(req, res);
}

app.use(express.static(path.join(__dirname, './../client/dist')));

app.use('/users', usersRouter);
app.use('/tutors', tutorsRouter);
app.use('/tests', testsRouter);
app.use('/sessions', sessionsRouter);
app.use('/feedback', feedbackRouter);
app.use('/earnings', earningsRouter);
// socket.io listening

io.on('connection', socket => {
  var room;
  socket.on('room', data => {
    room = data.room;
    socket.join(data.room);
  });
  socket.on('new-message', msg => {
    socket.broadcast
      .to(msg.room)
      .emit('new-message', { user: msg.user, message: msg.message });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.leave(room, () => {
      console.log('successfully left room');
    });
  });
});

server.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

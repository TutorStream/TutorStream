const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./../database');
const compression = require('compression');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const usersRouter = require('./routes/usersRoutes');
const tutorsRouter = require('./routes/tutorsRoutes');
const testsRouter = require('./routes/testsRoutes');
const sessionsRouter = require('./routes/sessionsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const earningsRouter = require('./routes/earningsRoutes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
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
    socket.leave(room);
  });
});

server.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

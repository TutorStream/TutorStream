const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require ('./../database');

const router = require('./routes');
// const usersRouter = require('./routes/usersRoutes');
// const tutorsRouter = require('./routes/tutorsRoutes');
// const testsRouter = require('./routes/testsRoutes');
// const sessionsRouter = require('./routes/sessionsRoutes');
// const feedbackRouter = require('./routes/feedbackRoutes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/dist')));

app.use('/', router);
// app.use('/users', usersRouter);
// app.use('/tutors', tutorsRouter);
// app.use('/tests', testsRouter);
// app.use('/sessions', sessionsRouter);
// app.use('/feedback', feedbackRouter);


app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

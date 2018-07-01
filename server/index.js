const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require ('./../database');

// const router = require('./routes');
const usersRouter = require('./routes/usersRoutes');
const tutorsRouter = require('./routes/tutorsRoutes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/dist')));

// mount router, just use homepage
app.use('/', router);
// app.


app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

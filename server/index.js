const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./routes');
const db = require ('./../database');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
console.log('right before serving static, i show up');
app.use(express.static(path.join(__dirname, './../client/dist')));

// mount router, just use homepage
app.use('/', router);


app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

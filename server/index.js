const express = require('express');
const bodyParser = require('body-parser');
// require router
const router = require('./routes');

const port = PROCESS.ENV 3000;

const app = express();

app.use(bodyParser.json());
// need to add a distribution file
app.use(express.static(__dirname + './../client/dist'))


app.listen(port, () => {
  console.log('TutorStream API listening on port: ' + port);
});


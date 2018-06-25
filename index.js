const express = require('express');
const {router} = require('./server/routes.js');
const path = require('path')
const app = express();
const db = require ('./database/connection.js');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/client/dist')));


app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

const express = require('express');
const app = express();

//const bcrypt = require('bcrypt');

const API_PATH = '/api';
var api = require('./controller/api');
app.use(API_PATH, api);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

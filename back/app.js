const express = require('express');
const app = express();

const API_PATH = '/api';
const api = require('./controller/api');
app.use(API_PATH, api);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

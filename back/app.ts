import express from 'express';
const app = express();

import './db/connection';

const API_PATH = '/api';
import api from './controller/api';
app.use(API_PATH, api);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

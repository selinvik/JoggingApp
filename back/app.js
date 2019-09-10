var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const {User} = require('./db_connection');
const {Record} = require('./db_connection');


app.use('*', function (req, res, next) {
  //if (req.method === 'OPTIONS') {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type, accept');
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
  }
  //res.writeHead(200, headers);
  //res.end();
  //} else {
  next();
  //}
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/create-account', async function (req, res) {
  const user = await User.create({ 
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    eMail     : req.body.eMail,
    password  : req.body.password 
  })
  res.send(user)
});

app.get('/get-records', async function(req, res) {
  const records = await Record.findAll()
  res.send(records)
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

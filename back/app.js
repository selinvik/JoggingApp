var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const {User} = require('./db_connection');


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

app.post('/test2', function (req, res) {
  console.log('body', req.body);
  res.send(User.create({ name: req.body.name }).then(user => {
    console.log("user's auto-generated ID:", user.id);
    })
  )
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

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

var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(passport.initialize());
//app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/create-account', async function (req, res) {
  const user = await User.create({ 
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    email     : req.body.email,
    password  : req.body.password 
  })
  res.send(user)
});

app.post('/add-record', async function (req, res) {
  const record = await Record.create({ 
    date      : req.body.date,
    distance  : req.body.distance,
    time      : req.body.time
  })
  res.send(record)
});

app.get('/get-records', async function(req, res) {
  try{
    const records = await Record.findAll()
    res.send(records)
  } catch (err) {
    //console.log(err);
  }
});

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/authentication',
  passport.authenticate('local', { successRedirect: '/records/',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

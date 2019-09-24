var passport = require('passport')
var session = require("express-session");
var LocalStrategy = require('passport-local').Strategy;
var router = require('express').Router();
const {User} = require('../db_connection');

router.use(session({ 
  secret: "cats", 
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //findById deprecated, use findByPk
  //https://sequelize.org/master/manual/models-usage.html
  User.findByPk(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  async function(username, password, done) {
    try {
      const user = await User.findOne({where: { email: username } });
      if (!user) {
        console.log('a');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log('b');
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('c');
      return done(null, user);
    } catch(err){
      return done(err);
    }
  }
));

module.exports = router;
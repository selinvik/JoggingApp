const passport = require('passport')
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const { SessionStore } = require('../db_connection');
const { User } = require('../models/User')

router.use(session({
  secret: 'keyboard cat',
  store: SessionStore,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true // if you do SSL outside of node.
}))
SessionStore.sync();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch(err){
    console.log(err);
    done(err, null);
  }
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
      /*const validPassword = await user.validPassword(password);
      console.log(`password: ${validPassword}`);*/
      if (!(await user.validPassword(password))) {
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
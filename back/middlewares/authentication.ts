import passport from 'passport';
import session from 'express-session';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import express from 'express';
const router = express.Router();
import User, { IUser } from '../db/models/User';
import mongoose from 'mongoose';
import connectMongoStore from 'connect-mongo';
const MongoStoreCreator = connectMongoStore(session);

router.use(session({
  secret: 'keyboard cat',
  store: new MongoStoreCreator({ mongooseConnection: mongoose.connection }),
  saveUninitialized: false,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true, // if you do SSL outside of node.
  cookie: { secure: true, sameSite: true, httpOnly: true }
}))

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser<IUser, number>(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser<IUser, number>(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err){
    console.error(err);
    done(err, null);
  }
});

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  async function(username, password, done) {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(await user.validPassword(password))) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch(err){
      return done(err);
    }
  }
));

export default router;
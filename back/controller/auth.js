const router = require('express').Router();
var passport = require('passport')

const authController = {
  create: async (req, res, next) => {
    await passport.authenticate('local', function(err, user, info) {
      if (err)  { 
        console.log('q1')
        return next(err);
      }
      if (!user) { 
        console.log('q2');
        console.log('orig: ', req.originalUrl)
        return res.redirect('/'); 
      }
      console.log('qqq');
      req.logIn(user, function(err) {
        console.log('q3', err)
        if (err) { return next(err); }
        return res.redirect('/records');
      });
    })(req, res, next);
  }
}


router.route('/')
  .post(authController.create);

module.exports = router;
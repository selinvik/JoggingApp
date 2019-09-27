const router = require('express').Router();
var passport = require('passport')

const authController = {
  create: async (req, res, next) => {
    await passport.authenticate('local', function(err, user, info) {
      if (err)  { 
        console.log('ошибка')
        return next(err);
      }
      if (!user) { 
        console.log('нету такого юзера')
        return res.status(422).send()
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log('юзер есть', err)
        console.log(user.id)
        res.status(201).send()
        //res.send(user.id)
      });
    })(req, res, next);
  }
}


router.route('/')
  .post(authController.create);

module.exports = router;
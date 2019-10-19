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
      req.logIn(user, async function(err) {
        if (err) { 
          return next(err); 
        }
        return res.status(201).send()
      });
    })(req, res, next);
  },
  delete: async (req, res, next) => {
    console.log('logout')
    await req.logout();
    return res.status(200).send()
  }
}

router.route('/')
  .post(authController.create)
  .delete(authController.delete)

module.exports = router;
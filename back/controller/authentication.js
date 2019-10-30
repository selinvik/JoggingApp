const router = require('express').Router();
const passport = require('passport');

const msleep = time =>
   new Promise(
       resolve => setTimeout(_=>resolve(), time)
   )
;

const authController = {
  create: async (req, res, next) => {
    await passport.authenticate('local', async function(err, user, info) {
      await msleep(1000);
      if (err)  {
        return next(err);
      }
      if (!user) {
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
    await req.logout();
    return res.status(200).send()
  }
}

router.route('/')
  .post(authController.create)
  .delete(authController.delete)

module.exports = router;
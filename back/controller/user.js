const router = require('express').Router();
const { User } = require('../db/models/models');
const bcrypt = require('bcrypt');

function generatePasswordHash(password){
  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt)
        .then((hash) => {
          return hash;
        })
        .catch(() => null);
    })
    .catch(() => null);
}

const userController = {
  create: async (req, res) => {
    const hashPassword = await generatePasswordHash(req.body.password);
    try {
      const user = await User.create({
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        email     : req.body.email,
        password  : hashPassword
      });
      res.send(user);
    } catch (err) {
      res.status(409).send();
    }
  }
}

router.route('/')
  .post(userController.create);

module.exports = router;
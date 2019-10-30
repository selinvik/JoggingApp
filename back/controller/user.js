const router = require('express').Router();
const { User } = require('../models/User');
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
    const user = await User.create({ 
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      email     : req.body.email,
      password  : hashPassword
    })
    res.send(user)
  }
}

router.route('/')
  .post(userController.create);

module.exports = router;
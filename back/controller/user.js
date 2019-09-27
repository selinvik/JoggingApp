const router = require('express').Router();
const {User} = require('../db_connection');

const userController = {
  create: async (req, res) => {
    const user = await User.create({ 
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      email     : req.body.email,
      password  : req.body.password 
    })
    res.send(user)
  }
}

router.route('/')
  .post(userController.create);

module.exports = router;
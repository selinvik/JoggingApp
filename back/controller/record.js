const router = require('express').Router();
const {Record} = require('../db_connection');
const authorization = require('../middlewares/authorization')

const recordController = {
  create: async function (req, res) {
    const user = req.user;
    const record = await Record.create({ 
      date      : req.body.date,
      distance  : req.body.distance,
      time      : req.body.time
    })
    await record.setUser(user);
    res.send(record)
  },
  list: async function (req, res) {
    try{
      const records = await Record.findAll({where: {UserId: req.user.id}})
      res.send(records)
    } catch (error) {
      console.log(req.body)
      console.error(error);
    }
  },
  update: async function (req, res ) {
    try{
      const record = await Record.findOne({ where: { id: req.user.id }})
      await record.update({ 
          date      : req.body.date,
          distance  : req.body.distance,
          time      : req.body.time
      })
      return res.status(200).send()
    } catch (error) {
      console.log(req.body)
      console.error(error);
    }
  }
}

router.route('/')
  .post(authorization, recordController.create)
  .get(authorization, recordController.list)
  .put(authorization, recordController.update);

module.exports = router;
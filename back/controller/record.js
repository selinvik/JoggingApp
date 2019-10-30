const router = require('express').Router();
const { Record } = require('../models/Record');
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
  record: async function (req, res){
    try{
      const record = await Record.findOne({ where: { id: req.params.id }})
      res.send(record)
    } catch (error) {
      console.log(req.body)
      console.error(error);
    }
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
      const record = await Record.findOne({ where: { id: req.body.id }})
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
  },
  delete: async function (req, res) {
    try{
      const record = await Record.findOne({ where: { id: req.body.id }})
      await record.destroy()
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
  .put(authorization, recordController.update)
  .delete(authorization, recordController.delete)

router.route('/:id')
.get(authorization, recordController.record)

module.exports = router;
const router = require('express').Router();
const {Record} = require('../db_connection');

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
      const records = await Record.findAll()
      res.send(records)
    } catch (error) {
      console.log(req.body)
      console.error(error);
    }
  }
}

router.route('/')
  .post(recordController.create)
  .get(recordController.list);

module.exports = router;
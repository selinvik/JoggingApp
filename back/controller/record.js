const router = require('express').Router();
const {Record} = require('../db_connection');

const recordController = {
  create: async (req, res) => {
    const record = await Record.create({ 
      date      : req.body.date,
      distance  : req.body.distance,
      time      : req.body.time
    })
    res.send(record)
  },
  list: async (req, res) => {
    try{
      const records = await Record.findAll()
      res.send(records)
    } catch (err) {
      //console.log(err);
    }
  }
}

router.route('/')
  .post(recordController.create)
  .get(recordController.list);

module.exports = router;
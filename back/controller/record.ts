import express, { RequestHandler } from 'express';
const router = express.Router();
import { Record, User } from '../db/models/models';
import authorization from '../middlewares/authorization';

const recordController: {
  [key: string]: RequestHandler
} = {
  create: async function (req, res) {
    try{
      const user = req.user as User;
      const record = await Record.create({
        date      : req.body.date,
        distance  : req.body.distance,
        time      : req.body.time
      })
      await record.setUser(user);
      res.send(record)
    } catch (error) {
      return res.status(500).send()
    }
  },
  record: async function (req, res){
    try{
      const record = await Record.findOne({ where: { id: req.params.id }})
      res.send(record)
    } catch (error) {
      return res.status(500).send()
    }
  },
  list: async function (req, res) {
    try{
      const records = await Record.findAll({where: {UserId: (req.user as User).id}})
      res.send(records)
    } catch (error) {
      return res.status(500).send()
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
      return res.status(500).send()
    }
  },
  delete: async function (req, res) {
    try{
      const record = await Record.findOne({ where: { id: req.body.id }})
      await record.destroy()
      return res.status(200).send()
    } catch (error) {
      return res.status(500).send()
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

export default router;
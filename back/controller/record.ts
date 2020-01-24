import express, { RequestHandler } from 'express';
const router = express.Router();
import { IUser } from '../db/models/User';
import Record from '../db/models/Record';
import authorization from '../middlewares/authorization';

const recordController: {
  [key: string]: RequestHandler
} = {
  create: async function (req, res) {
    try{
      const user = req.user as IUser;
      const record = await Record.create({
        date      : req.body.date,
        distance  : req.body.distance,
        time      : req.body.time,
        user      : user.id
      })
      await user.updateOne({
        $push: {records: record}
      })
      res.send(record)
    } catch (error) {
      return res.status(500).send()
    }
  },
  record: async function (req, res){
    try{
      const record = await Record.findById(req.params.id);
      res.send(record);
    } catch (error) {
      return res.status(500).send()
    }
  },
  list: async function (req, res) {
    try{
      const userWithRecords = await (req.user as IUser).populate('records').execPopulate();
      res.send(userWithRecords.records);
    } catch (error) {
      //TODO: remove try catch where possible, handle it on upper level, log in console error
      console.error(error);
      return res.status(500).send()
    }
  },
  update: async function (req, res ) {
    try{
      const record = await Record.findById(req.body.id)
      await record.updateOne({
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
      const user = req.user as IUser;
      const record = await Record.findByIdAndDelete(req.body.id)
      await user.updateOne({
        $pull: { records: record.id }
      })
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
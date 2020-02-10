import express, { RequestHandler } from 'express';
const router = express.Router();
import User, { IUser } from '../db/models/User';
import authorization from '../middlewares/authorization';

//todo return correct restapi errors if resource not found,
//among all project. Handle it on frontend

const recordController: {
  [key: string]: RequestHandler
} = {
  create: async function (req, res) {
    try{
      const user = req.user as IUser;
      const record = {
        date      : req.body.date,
        distance  : req.body.distance,
        time      : req.body.time,
      }
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
      const user = req.user as IUser;
      const record = user.records.find(r => r.id === req.params.id);
      if (record === undefined){
        return res.status(404).send();
      }
      res.send(record);
    } catch (error) {
      return res.status(500).send()
    }
  },
  list: async function (req, res) {
    try{
      //todo so we store records in user, and it's stored in session all the time? check
      const user = req.user as IUser;
      res.send(user.records);
    } catch (error) {
      //TODO: remove try catch where possible, handle it on upper level, log in console error
      console.error(error);
      return res.status(500).send()
    }
  },
  update: async function (req, res) {
    try{
      const user = req.user as IUser;
      await User.findOneAndUpdate(
        { "_id": user.id, "records._id": req.body.id },
        { 
            "$set": {
                "records.$.date"      : req.body.date,
                "records.$.distance"  : req.body.distance,
                "records.$.time"      : req.body.time
            }
        }
      );
      return res.status(200).send()
    } catch (error) {
      return res.status(500).send()
    }
  },
  delete: async function (req, res) {
    try{
      const user = req.user as IUser;
      await User.findOneAndUpdate(
        { _id: user.id },
        {
          $pull: {
            records: {
             _id: req.body.id
            }
          }
        }
      );
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
import express, { RequestHandler } from 'express';
const router = express.Router();
import { IUser } from '../db/models/User';
import Record from '../db/models/Record';
import authorization from '../middlewares/authorization';
import mongoose from 'mongoose';

const reportController: {
  [key: string]: RequestHandler
} = {
  list: async function (req, res) {
    try{
      const reports = await Record.aggregate([
        { $match : { user: mongoose.Types.ObjectId((req.user as IUser).id) } },
        {
          $group: 
            {
              _id: {
                year: { '$year' : '$date' },
                week: { '$week' : '$date' }
              },
              avgWeekDist: { $avg : '$distance' },
              avgWeekTime: { $avg : '$time' }
            }
        },
        { $sort : { '_id.year': 1, '_id.week': 1 } }
      ])
      res.send(reports)
    } catch (error) {
      console.log(error)
      return res.status(500).send()
    }
  }
}

router.route('/')
  .get(authorization, reportController.list);

export default router;
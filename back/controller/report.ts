import express, { RequestHandler } from 'express';
const router = express.Router();
import { IUser } from '../db/models/User';
import authorization from '../middlewares/authorization';
import moment from 'moment'

interface IReport{
  avgWeekDist : number;
  avgWeekTime : number;
  date        : Date;
}

const reportController: {
  [key: string]: RequestHandler
} = {
  list: async function (req, res) {
    try{
      const user = req.user as IUser;
      var records = user.records;
      records.sort(function(a, b){
        //todo check do we need new date here? Because of mongo storage date strange?
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return +dateA - +dateB;
      });
      var reports: IReport[] = [];
      for (var i = 0; i < records.length; i++){//todo rewrite with while
        var distance = records[i].distance;
        var time = records[i].time;
        var cnt = 1;
        var j = i + 1;
        while (j < records.length){
          if (
            records[i].date.getFullYear() === records[j].date.getFullYear()
            && moment(records[i].date).weeks() === moment(records[j].date).weeks()
          ){
            distance += records[j].distance;
            time += records[j].time;
            cnt++;
          } else {
            break;
          }
          j++;
        }
        var avgResults = {
          avgWeekDist: distance / cnt,
          avgWeekTime: time / cnt,
          date: records[i].date,//todo check do we need date here
        }
        i = j - 1;
        reports.push(avgResults)
      }
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
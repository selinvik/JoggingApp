import express, { RequestHandler } from 'express';
const router = express.Router();
import { Record } from '../db/models/models';
import Sequelize from 'sequelize';
import authorization from '../middlewares/authorization';

const reportController: {
  [key: string]: RequestHandler
} = {
  list: async function (req, res) {
    try{
      const reports = await Record.findAll({
        attributes: [
          [Sequelize.fn('date_trunc', 'week', Sequelize.col('date')), 'week'],
          [Sequelize.cast(Sequelize.fn('AVG', Sequelize.col('distance')), 'INTEGER'), 'avgWeekDist'],
          [Sequelize.cast(Sequelize.fn('AVG', Sequelize.col('time')), 'INTEGER'), 'avgWeekTime']],
        group: ['week'],
        order: [[Sequelize.fn('date_trunc', 'week', Sequelize.col('date')), 'ASC']],
        where: {UserId: req.user.id}
      })
      res.send(reports)
    } catch (error) {
      console.error(error);
    }
  }
}

router.route('/')
  .get(authorization, reportController.list);

export default router;
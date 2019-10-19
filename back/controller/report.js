const router = require('express').Router();
const {Record} = require('../db_connection');
const Sequelize = require('sequelize');
const authorization = require('../middlewares/authorization')

const reportController = {
  list: async function (req, res) {
    try{
      const reports = await Record.findAll({
        attributes: [
          [Sequelize.fn('date_trunc', 'week', Sequelize.col('date')), 'week'], 
          [Sequelize.cast(Sequelize.fn('AVG', Sequelize.col('distance')), 'INTEGER'), 'avgDist'], 
          [Sequelize.cast(Sequelize.fn('AVG', Sequelize.col('time')), 'INTEGER'), 'avgTime']],
        group: ['week'],
        order: [[Sequelize.fn('date_trunc', 'week', Sequelize.col('date')), 'ASC']], 
        where: {UserId: req.user.id}
      }) 
      res.send(reports)
    } catch (error) {
      console.log(req.body)
      console.error(error);
    }
  }
}

router.route('/')
  .get(authorization, reportController.list);

module.exports = router;
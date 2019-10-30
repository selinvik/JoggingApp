const Sequelize = require('sequelize');
const { sequelize } = require('../db_connection');

const Record = sequelize.define('Records', {
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  date      : { type: Sequelize.DATE},
  distance  : { type: Sequelize.INTEGER},
  time      : { type: Sequelize.INTEGER},
});

module.exports = { Record };
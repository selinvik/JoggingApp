const session = require("express-session");
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = new Sequelize('admin', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

const SessionStore = new SequelizeStore({
  db: sequelize
})

module.exports = { sequelize, SessionStore };

const { User } = require('./models/User')
const { Record } = require('./models/Record')

User.hasMany(Record);
Record.belongsTo(User);

const { synchronization } = require('./init')
synchronization();




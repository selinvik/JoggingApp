const session = require("express-session");
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = new Sequelize('JogTracker', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

const SessionStore = new SequelizeStore({
  db: sequelize
})

module.exports = { sequelize, SessionStore };
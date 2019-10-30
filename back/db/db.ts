import session from "express-session";
import Sequelize from 'sequelize';
const SequelizeStore = require('connect-session-sequelize')(session.Store);

export const sequelize = new Sequelize.Sequelize('JogTracker', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

export const SessionStore = new SequelizeStore({
  db: sequelize
});
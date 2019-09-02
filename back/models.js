const Sequelize = require('sequelize'); 
const sequelize = require('./db_connection');

const User = sequelize.define('Users', { 
 id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
 name: { type: Sequelize.STRING(MAX_FIRSTNAME_LENGTH) }, 
 });

 module.exports = sequelize;
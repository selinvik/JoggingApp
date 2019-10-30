const Sequelize = require('sequelize');
const { sequelize } = require('../db_connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('Users', {
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  firstName : { type: Sequelize.STRING},
  lastName  : { type: Sequelize.STRING},
  email     : { type: Sequelize.STRING},
  password  : { type: Sequelize.STRING},
});

User.prototype.validPassword = async function(password){
  return await bcrypt.compare(password, this.dataValues.password);
}

module.exports = { User };
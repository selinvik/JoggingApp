const Sequelize = require('sequelize');

const sequelize = new Sequelize('admin', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('Users', { 
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
  name: { type: Sequelize.STRING}, 
  });

  User.create({
    name: 'Viktor'
  });

  /*User.create({ id: 1, name: 'Viktor' }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
  });*/

module.exports = sequelize;

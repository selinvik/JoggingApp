const Sequelize = require('sequelize');

const sequelize = new Sequelize('admin', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('Users', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
  firstName : { type: Sequelize.STRING},
  lastName  : { type: Sequelize.STRING},
  eMail     : { type: Sequelize.STRING},
  password  : { type: Sequelize.STRING}, 
});

const Record = sequelize.define('Records', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
  date      : { type: Sequelize.DATE},
  distance  : { type: Sequelize.STRING},
  time      : { type: Sequelize.TIME},
});

/*// Note: using `force: true` will drop the table if it already exists
Record.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return Record.create({
    date: '08.08.2018',
    distance: '1000',
    time: '5:36'
  });
});*/

module.exports = sequelize;

module.exports = {User, Record};


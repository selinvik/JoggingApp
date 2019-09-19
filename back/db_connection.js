const Sequelize = require('sequelize');

const sequelize = new Sequelize('admin', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('Users', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
  firstName : { type: Sequelize.STRING},
  lastName  : { type: Sequelize.STRING},
  email     : { type: Sequelize.STRING},
  password  : { type: Sequelize.STRING}, 
});

const Record = sequelize.define('Records', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  //uuid      : { type: Sequelize.UUID, primaryKey: true },
  date      : { type: Sequelize.DATE},
  distance  : { type: Sequelize.STRING},
  time      : { type: Sequelize.TIME},
});

/*User.sync({ force: true }).then(() => {
  return User.create({
    firstName: 'Viktor',
    lastName: 'Selin',
    email: '123@bk.ru',
    password: 'qwerty'
  });
});

Record.sync({ force: true }).then(() => {
  return Record.create({
    date: '01-01-2018',
    distance: '1000',
    time: '5:36',
  });
});*/

User.hasMany(Record);
Record.belongsTo(User);

module.exports = sequelize;

module.exports = {User, Record};


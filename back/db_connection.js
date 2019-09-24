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

User.prototype.validPassword = function(password){
  console.log('TODO: check password here');
  console.log('current user password: ', this.dataValues.password);
  return true;
}


const Record = sequelize.define('Records', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
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

/*User.hasMany(Record);
Record.belongsTo(User);*/

module.exports = sequelize;

module.exports = {User, Record};


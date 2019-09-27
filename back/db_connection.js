var session = require("express-session");
const Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = new Sequelize('admin', 'postgres', '3345', {
  host: 'localhost',
  dialect: 'postgres'
});

const SessionStore = new SequelizeStore({
  db: sequelize
})

const User = sequelize.define('Users', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
  firstName : { type: Sequelize.STRING},
  lastName  : { type: Sequelize.STRING},
  email     : { type: Sequelize.STRING},
  password  : { type: Sequelize.STRING}, 
});


User.prototype.validPassword = function(password){
  console.log('TODO: check password here' + password);
  console.log('current user password: ', this.dataValues.password);
  if (password === this.dataValues.password){
    return true;
  }
  else return false
}

const Record = sequelize.define('Records', { 
  id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  date      : { type: Sequelize.DATE},
  distance  : { type: Sequelize.STRING},
  time      : { type: Sequelize.TIME},
});

User.hasMany(Record);
Record.belongsTo(User);

/*
//After all tables and relations between them are defined we can sync it with DB.
sequelize.sync({ force: true }).then(async () => {
  //and only after that we can insert some test data in DB.
  const user = await User.create({
    firstName: 'Viktor',
    lastName: 'Selin',
    email: '123@bk.ru',
    password: 'qwerty'
  });

  const record = await Record.create({
    date: '01-01-2018',
    distance: '1000',
    time: '5:36',
  });
  //adding user referrence to Record
  await record.setUser(user);

  //now this record.getUser will return this user
  console.log('user of record: ', (await record.getUser()).get());
  //and user.getRecords will return this record
  console.log('records of user: ', (await user.getRecords()).map(record => record.get()));
});*/

module.exports = {sequelize, SessionStore, User, Record};


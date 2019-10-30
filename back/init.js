const { User } = require('./models/User')
const { Record } = require('./models/Record')
const { sequelize } = require('./db_connection');

//After all tables and relations between them are defined we can sync it with DB.
const synchronization = () => {
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
      distance: 1000,
      time: 536,
    });
    //adding user referrence to Record
    await record.setUser(user);

    //now this record.getUser will return this user
    console.log('user of record: ', (await record.getUser()).get());
    //and user.getRecords will return this record
    console.log('records of user: ', (await user.getRecords()).map(record => record.get()));
  });
}

module.exports = { synchronization };
const { User } = require('./User')
const { Record } = require('./Record')

User.hasMany(Record);
Record.belongsTo(User);

module.exports = { User, Record };
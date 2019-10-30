import { User } from './User'
import { Record } from './Record'

User.hasMany(Record, { as: 'records'});
Record.belongsTo(User);

export { User, Record };
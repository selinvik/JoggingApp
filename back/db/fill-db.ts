import User from './models/User';
import Record from './models/Record';
import './connection';
import { generatePasswordHash } from '../utils/functions';

const testEmail = '1@bk.ru';

//After all tables and relations between them are defined we can sync it with DB.
const synchronization = async () => {
  console.log('Filling db');
  try {
    const userExists = await User.exists({ email: testEmail });
    if (userExists){
      console.log(`User with email '${testEmail}' already exists`);
      return;
    }

    const user = new User({
      firstName: 'Viktor',
      lastName: 'Selin',
      email: testEmail,
      password: await generatePasswordHash('qwerty'),
    });
    const record = await Record.create({
      date: '01-01-2018',
      distance: 1000,
      time: 536,
      user: user.id
    });
    user.records.push(record);
    await user.save();

    const u1 = await (await User.findById(user.id).populate('records')).execPopulate();
    const r1 = u1.records[0];
    if (r1.id !== record.id)
      throw Error(`Record ${r1.id} doesn't linked to record ${record.id}`);
    
    const r2 = await (await Record.findById(record.id).populate('user')).execPopulate();
    const u2 = r2.user;
    if (u2.id !== user.id)
      throw Error(`Record ${u2.id} doesn't linked to record ${user.id}`);
    //todo if creation ended with error, remove created objects

    console.log('Successefull db fill');

   } catch (err) {
      console.log(`Error during fill-db`);
      console.error(err);
      //throw err;
  }
}

synchronization();
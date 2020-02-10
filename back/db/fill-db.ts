import User from './models/User';
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

    const user = new User({//todo may be replace with user.create
      firstName: 'Viktor',
      lastName: 'Selin',
      email: testEmail,
      password: await generatePasswordHash('qwerty'),
      records: {
        date: '01-01-2018',
        distance: 1000,
        time: 536 
      }
    });
    await user.save();

    //todo if creation ended with error, remove created objects

    console.log('Successefull db fill');

   } catch (err) {
      console.log(`Error during fill-db`);
      console.error(err);
      //throw err;
  }
}

synchronization();
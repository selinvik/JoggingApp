import mongoose from 'mongoose';

//todo do we need set useFindAndModify: false
export const Mongoose = mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function (err) {
  if (err) throw err;
  console.log('DB successfully connected');
});

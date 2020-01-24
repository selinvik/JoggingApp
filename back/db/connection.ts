import mongoose from 'mongoose';

export const Mongoose = mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
  if (err) throw err;
  console.log('DB successfully connected');
});

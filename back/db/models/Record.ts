import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { ModelNames } from './constants';

export interface IRecord extends Document {
  date: Date;
  distance: number;
  time: number;
  user?: IUser;
}

const RecordSchema: Schema = new Schema({
  date: { type: Date, required: true },
  distance: { type: Number, required: true },
  time: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: ModelNames.User, index: true }
}, { 
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
});

export default mongoose.model<IRecord>(ModelNames.Record, RecordSchema);
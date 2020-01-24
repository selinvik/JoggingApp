import mongoose, { Schema, Document } from 'mongoose';
import { IRecord } from './Record';
import { ModelNames } from './constants';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  records?: IRecord[];
  validPassword: (password: string) => Promise<boolean> 
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  records: [{ type: Schema.Types.ObjectId, ref: ModelNames.Record }]
}, { 
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
});

UserSchema.methods.validPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>(ModelNames.User, UserSchema);
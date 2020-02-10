import mongoose, { Types, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IRecord extends Types.Subdocument {
  date: Date;
  distance: number;
  time: number;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  records?: Types.Array<IRecord>;
  validPassword: (password: string) => Promise<boolean> 
}

export const RecordSchema: Schema = new Schema({
  date: { type: Date, required: true },
  distance: { type: Number, required: true },
  time: { type: Number, required: true },
}, { 
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
})

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  records: [RecordSchema]
}, { 
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
});

UserSchema.methods.validPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
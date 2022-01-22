import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

//순서대로 이름, 이메일, 패스워드, 가입날짜
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  secretKey: {
    type: String,
  },
  accessKey: {
    type: String,
  },
  strategy: {
    type: String,
    default: '',
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);

import mongoose from 'mongoose';
import { IRefreshToken } from '../interfaces/IRefreshToken';

const RefreshTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IRefreshToken & mongoose.Document>('RefreshToken', RefreshTokenSchema);

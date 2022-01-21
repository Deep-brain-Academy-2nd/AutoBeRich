import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,

  mongoURL: process.env.MONGO_URL || '',

  //JWT
  jwtSecret: process.env.JWT_SECRET || '',
  jwtAlgorithm: process.env.JWT_ALGO || '',

  //암호화 키
  upbitEncryptKey: process.env.UPBIT_ENCRYPT_KEY || '',
  sessionEncryptKey: process.env.SESSION_ENCRYPT_KEY || '',
};

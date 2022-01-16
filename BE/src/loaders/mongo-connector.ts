import mongoose from 'mongoose';
import properties from '../config/properties/properties';
import User from '../models/User';

const connectDB = async (): Promise<any> => {
  try {
    await mongoose.connect(properties.mongoURL, {
      keepAlive: true,
      /*useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,*/
    });

    console.log('Mongoose Connected ...');
    User.createCollection().then(function (collection) {
      console.log('User Collection is created!');
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

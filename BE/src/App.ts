import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRouter from './routes/index';
import connectDB from './loaders/mongo-connector';
import properties from './config/properties/properties';
import cors from 'cors';

connectDB();
//require('dotenv').config();

const app: express.Application = express();

app.set('port', properties.port || 5000);

// 사용자 정보 남기기 위한 morgan
if (properties.NODE_ENV === 'production') {
  app.use(morgan('production'));
} else {
  app.use(morgan('dev'));
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS 설정
const whiteList: [string, string] = [properties.local, properties.aws_client];

const coreOptions: any = {
  origin(origin: string, callback: any) {
    const isWhitelisted = whiteList.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true,
};
app.use(cors(coreOptions));

// router connect
app.use('/', indexRouter);

// server start
app
  .listen(app.get('port'), () => {
    console.log(app.get('port'), 'started server');
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

export default app;

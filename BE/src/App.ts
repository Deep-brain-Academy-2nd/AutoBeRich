import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRouter from './routes/index';
import connectDB from './loaders/mongo-connector';
import properties from './config/properties/properties';
import cors from 'cors';
import sanitizeHTML from 'sanitize-html';
import { logger } from './loaders/logger';
import hpp from 'hpp';
import helmet from 'helmet';

connectDB();
//require('dotenv').config();

const app: express.Application = express();

app.set('port', properties.port || 5000);

// 사용자 정보 남기기 위한 morgan
if (properties.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
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

// block xss for sanitize-html
const dirty = "<h1>alert('hi');</h1>";
sanitizeHTML(dirty, {
  allowedTags: sanitizeHTML.defaults.allowedTags.concat(['img']),
  allowedAttributes: { a: ['href'] },
});

// router connect
app.use('/', indexRouter);

// server start
app
  .listen(app.get('port'), () => {
    logger.info('Server listening on port 3000');
    console.log(app.get('port'), 'started server');
  })
  .on('error', (err) => {
    logger.info('hello');
    logger.error(err.message);
    console.error(err);
    process.exit(1);
  });

export default app;

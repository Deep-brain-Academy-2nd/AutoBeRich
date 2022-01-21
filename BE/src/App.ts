import express from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRouter from './routes/index';
import connectDB from './loaders/mongo-connector';
import properties from './config/properties/properties';
import cors from 'cors';
import session from 'express-session';
import session_file_store from 'session-file-store';

const fileStore = session_file_store(session);

connectDB();
//require('dotenv').config();

const app: express.Application = express();

app.set('port', properties.port || 5000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS 설정
const coreOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(coreOptions));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(
  session({
    secret: properties.key2,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 60 * 60 * 24),
    },
    store: new fileStore(),
  })
);

app.use('/', indexRouter);
app
  .listen(app.get('port'), () => {
    console.log(app.get('port'), 'started server');
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

export default app;

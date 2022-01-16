import express from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRouter from './routes/index';
import connectDB from './loaders/mongo-connector';
import properties from './config/properties/properties';

connectDB();
//require('dotenv').config();

const app: express.Application = express();

app.set('port', properties.port || 5000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

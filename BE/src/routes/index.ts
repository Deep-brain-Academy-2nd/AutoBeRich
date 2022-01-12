import express, { Request, Response } from 'express';
import userRouter from "./user-router";
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
/*const sign = require('jsonwebtoken').sign;*/

// 분리 필요

const router = express.Router();
require('dotenv').config();

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;

const payload = {
  access_key: access_key,
  nonce: uuidv4(),
};

/*const token = sign(payload, secret_key);*/
/*const authorizationToken = `Bearer ${token}`;*/

const getMarketAll = () => {
  const options = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/market/all',
    params: { isDetails: 'false' },
    headers: { Accept: 'application/json' },
  };

  axios
    .request(options)
    .then(function (response: Response) {
      // console.log(response.data);
    })
    .catch(function (error: Error) {
      console.error(error);
    });
};

const getCoinInfos = (name: string) => {
  const options = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/ticker',
    headers: { Accept: 'application/json' },
    params: { markets: name },
  };

  axios
    .request(options)
    .then(function (response: Response) {
      // console.log(response.data);
    })
    .catch(function (error: Error) {
      console.error(error);
    });
};

/*const getMyAccountInfos = () => {
  const options = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/accounts',
    headers: { Authorization: authorizationToken },
  };

  axios
    .request(options)
    .then(function (response: Response) {
      // console.log(response.data);
    })
    .catch(function (error: Error) {
      console.error(error);
    });
};*/

/*router.get('/', (req, res) => {
  getMyAccountInfos();
  res.send('');
});*/

router.use('/users', userRouter);

export default router;

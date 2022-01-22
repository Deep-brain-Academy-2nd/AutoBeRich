import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';

import properties from '../config/properties/properties';

const router = express.Router();

const accessKey = properties.upbitAccessKey;
const secretKey = properties.upbitSecretKey;

const payload = {
  accessKey,
  nonce: uuidv4(),
};

const token = sign(payload, secretKey);
const authorizationToken = `Bearer ${token}`;

// const getMarketAll = () => {
//   const options = {
//     method: 'GET',
//     url: 'https://api.upbit.com/v1/market/all',
//     params: { isDetails: 'false' },
//     headers: { Accept: 'application/json' },
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };

// const getCoinInfos = (name) => {
//   const options = {
//     method: 'GET',
//     url: 'https://api.upbit.com/v1/ticker',
//     headers: { Accept: 'application/json' },
//     params: { markets: name },
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };
type optionType = {
  method: any;
  url: string;
  headers: {
    Authorization: string;
  };
};
const getMyAccountInfos = () => {
  const options: optionType = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/accounts',
    headers: { Authorization: authorizationToken },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

router.get('/getUserInfo', (req, res) => {
  getMyAccountInfos();
  res.send('');
});

export default getMyAccountInfos;

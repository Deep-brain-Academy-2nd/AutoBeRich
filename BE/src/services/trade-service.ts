import User from '../models/User';
import UserService from './user-service';
import { ExchangeService, QuoationService } from 'node-upbit';
import properties from '../config/properties/properties';
import { IUser, userUniqueSearchInput } from '../interfaces/IUser';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';
import axios, { AxiosRequestConfig } from 'axios';
import { IAccount } from '../interfaces/IAccount';
import { encode as queryEncode } from 'querystring';
import crypto from 'crypto';
import rp from 'request-promise';

const tradeStating = async (data: userUniqueSearchInput) => {
  // const { email } = data;
  // const user: IUser | null = await UserService.findEmail({ email });
  // // @ts-ignore
  // const { secretKey, accessKey, strategy, status }: IUser = user;
  // // @ts-ignore
  // const bytes = CryptoJS.AES.decrypt(accessKey, properties.upbitEncryptKey);
  // const decryptedAccessKey = bytes.toString(CryptoJS.enc.Utf8);
  // // @ts-ignore
  // const tmp = CryptoJS.AES.decrypt(secretKey, properties.upbitEncryptKey);
  // const decryptedSecretKey = tmp.toString(CryptoJS.enc.Utf8);

  // //const targetPrice = await getTargetPrice('KRW-BTC', 0.5);
  // //const startTime = await getStartTime('KRW-BTC');
  // //const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
  // /*const krw = balances.find((item: IAccount) => {
  //   return item.currency === 'KRW';
  // });*/
  // //const currentPrice = await getCurrentPrice('KRW-BTC');

  // try {
  //   const now = new Date();
  //   const startTime = await getStartTime('KRW-BTC');
  //   const endTime = addDays(now, 1).getTime();
  //   const endTimeTenSeconds = addSeconds(new Date(endTime), -10).getTime();

  //   if (startTime < now.getTime() && now.getTime() < endTimeTenSeconds) {
  //     const targetPrice = await getTargetPrice('KRW-BTC', 0.5);
  //     const currentPrice = await getCurrentPrice('KRW-BTC');
  //     if (targetPrice < currentPrice) {
  //       const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
  //       const krw = balances.find((item: IAccount) => {
  //         return item.currency === 'KRW';
  //       });
  //       if (krw.balance > 5000) {
  //         buyMarketOrder('KRW-BTC', krw * 0.9995, decryptedAccessKey, decryptedSecretKey);
  //       }
  //     }
  //   } else {
  //     const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
  //     const btc = balances.find((item: IAccount) => {
  //       return item.currency === 'BTC';
  //     });

  //     if (btc.balance > 0.00008) {
  //       await sellMarketOrder('KRW-BTC', btc * 0.9995, decryptedAccessKey, decryptedSecretKey);
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  // buyMarketOrder(
  //   'KRW-BTC',
  //   80000000 * 0.9995,
  //   'm6WSIUFqpFBXxKRI4yxajjLsZJlOi9453McwhMma',
  //   'IQNmkcbgplT3QEt5kuk831JaxQkrh50AUcx9mhxf'
  // );
  order_bid('KRW-BTC', 0.0002, 44000000);
};

//시장가 매수
// const buyMarketOrder = async (ticker: string, price: number, accessKey: string, secretKey: string) => {
//   try {
//     const body = {
//       market: ticker,
//       side: 'bid',
//       price: price.toString(),
//       ord_type: 'price',
//     };
//     const temp = {
//       market: 'KRW-BTC',
//     };
//     const temp2 = queryEncode(temp);

//     const query = queryEncode(body);

//     const hash = crypto.createHash('sha512');
//     const queryHash = hash.update(temp2, 'utf-8').digest('hex');

//     const payload = {
//       access_key: accessKey,
//       nonce: uuidv4(),
//       query_hash: queryHash,
//       query_hash_alg: 'SHA512',
//     };

//     const token = sign(payload, secretKey);

//     const options: any = {
//       method: 'POST',
//       url: 'https://api.upbit.com/v1/orders?' + temp2,
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//       body,
//     };

//     return axios
//       .request(options)
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   } catch (error) {
//     console.error(error);
//   }
// };

// //시장가 매도
// const sellMarketOrder = async (ticker: string, volume: number, accessKey: string, secretKey: string) => {
//   try {
//     const body = {
//       market: ticker,
//       side: 'ask',
//       volume: volume.toString(),
//       ord_type: 'market',
//     };

//     const query = queryEncode(body);

//     const hash = crypto.createHash('sha512');
//     const queryHash = hash.update(query, 'utf-8').digest('hex');

//     const payload = {
//       access_key: accessKey,
//       nonce: uuidv4(),
//       query_hash: queryHash,
//       query_hash_alg: 'SHA512',
//     };

//     const token = sign(payload, secretKey);

//     const options: any = {
//       method: 'POST',
//       url: 'https://api.upbit.com/v1/orders',
//       headers: { Authorization: `Bearer ${token}` },
//       json: body,
//     };

//     return axios
//       .request(options)
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   } catch (error) {
//     console.error(error);
//   }
// };

// const addDays = (date: Date, days: number) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

// const addSeconds = (date: Date, seconds: number) => {
//   const result = new Date(date);
//   result.setSeconds(result.getSeconds() + seconds);
//   return result;
// };

// 주문(매수)
async function order_bid(market: any, volume: any, price: any) {
  //market: KRW-BTC
  const url = 'https://api.upbit.com/v1/orders';
  const qs = { market: market, side: 'bid', volume: volume, price: price, ord_type: 'limit' };

  const query = queryEncode(qs);
  const hash = crypto.createHash('sha512');
  const queryHash = hash.update(query, 'utf-8').digest('hex');

  const payload = {
    access_key: 'vEGK59WVCgVL2DMsO9p4cowZQovfBP0OB6IsDRu1',
    // nonce: new Date().getTime(),
    // query: query,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: 'SHA512',
  };
  const token = sign(payload, 'xZcCPkqIMHFW6ATT2wuix3VCwBaxKeXQ7ZvTjnWa');

  const result = await request(url, qs, token, 'POST');
  return result;
}

async function request(url: any, qs: any, token: any, method: any) {
  if (!method) {
    method = 'GET';
  }
  const options = {
    method: method,
    url: url,
    json: true,
    headers: {},
    qs: {},
    data: null,
    transform: function (body: any, response: any) {
      let remain_min = 0;
      let remain_sec = 0;
      if (response.headers && response.headers['remaining-req']) {
        const items = response.headers['remaining-req'].split(';');
        for (const item of items) {
          const [key, val] = item.split('=');
          if (key.trim() == 'min') {
            remain_min = parseInt(val.trim());
          } else if (key.trim() == 'sec') {
            remain_sec = parseInt(val.trim());
          }
        }
      }
      return {
        success: true,
        remain_min: remain_min,
        remain_sec: remain_sec,
        data: body,
      };
    },
  };
  if (method == 'POST') {
    options.json = qs;
  } else {
    options.qs = qs;
  }
  if (token) {
    options.headers = { Authorization: `Bearer ${token}` };
  }
  let result = { success: false, message: null, name: null };
  try {
    result = await rp(options);
  } catch (e) {
    console.error(e);
  }

  return result;
}

export default {
  tradeStating,
};

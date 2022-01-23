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

const tradeStating = async (data: userUniqueSearchInput) => {
  const { email } = data;
  const user: IUser | null = await UserService.findEmail({ email });
  // @ts-ignore
  const { secretKey, accessKey, strategy, status }: IUser = user;
  // @ts-ignore
  const bytes = CryptoJS.AES.decrypt(accessKey, properties.upbitEncryptKey);
  const decryptedAccessKey = bytes.toString(CryptoJS.enc.Utf8);
  // @ts-ignore
  const tmp = CryptoJS.AES.decrypt(secretKey, properties.upbitEncryptKey);
  const decryptedSecretKey = tmp.toString(CryptoJS.enc.Utf8);

  //const targetPrice = await getTargetPrice('KRW-BTC', 0.5);
  //const startTime = await getStartTime('KRW-BTC');
  //const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
  /*const krw = balances.find((item: IAccount) => {
    return item.currency === 'KRW';
  });*/
  //const currentPrice = await getCurrentPrice('KRW-BTC');

  try {
    const now = new Date();
    const startTime = await getStartTime('KRW-BTC');
    const endTime = addDays(now, 1).getTime();
    const endTimeTenSeconds = addSeconds(new Date(endTime), -10).getTime();

    if (startTime < now.getTime() && now.getTime() < endTimeTenSeconds) {
      const targetPrice = await getTargetPrice('KRW-BTC', 0.5);
      const currentPrice = await getCurrentPrice('KRW-BTC');
      if (targetPrice < currentPrice) {
        const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
        const krw = balances.find((item: IAccount) => {
          return item.currency === 'KRW';
        });
        if (krw.balance > 5000) {
          buyMarketOrder('KRW-BTC', krw * 0.9995, decryptedAccessKey, decryptedSecretKey);
        }
      }
    } else {
      const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
      const btc = balances.find((item: IAccount) => {
        return item.currency === 'BTC';
      });

      if (btc.balance > 0.00008) {
        await sellMarketOrder('KRW-BTC', btc.balance * 0.9995, decryptedAccessKey, decryptedSecretKey);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// 변동성 돌파 전략으로 매수 목표가 조회
const getTargetPrice = async (ticker: string, k: number) => {
  const quoationService = new QuoationService();

  const df = await quoationService.getDayCandles({
    marketCoin: ticker,
    count: 2,
  });

  const targetPrice = df[0].prev_closing_price + (df[0].high_price = df[0].low_price) * k;
  return targetPrice;
};

// 시작 시간 조회
const getStartTime = async (ticker: string) => {
  const quoationService = new QuoationService();

  const df = await quoationService.getDayCandles({
    marketCoin: ticker,
    count: 1,
  });

  const startTime = df[0].timestamp;
  return startTime;
};

// 잔고 조회
const getBalance = async (decryptedAccessKey: string, decryptedSecretKey: string) => {
  const payload = {
    access_key: decryptedAccessKey,
    nonce: uuidv4(),
  };

  const token = sign(payload, decryptedSecretKey);
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/accounts',
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios
    .request(options)
    .then((response) => {
      const balances = response.data;
      return balances;
    })
    .catch((err) => console.error(err));
};

//현재가 조회
const getCurrentPrice = async (ticker: string) => {
  const quoationService = new QuoationService();

  const orderBookList = await quoationService.getOrderbook([ticker]);

  return orderBookList[0].orderbook_units[0].ask_price;
};

//시장가 매수
const buyMarketOrder = async (ticker: string, price: number, accessKey: string, secretKey: string) => {
  try {
    const body = {
      market: ticker,
      side: 'bid',
      price: price.toString(),
      ord_type: 'price',
    };

    const query = queryEncode(body);

    const hash = crypto.createHash('sha512');
    const queryHash = hash.update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, secretKey);

    const options: any = {
      method: 'POST',
      url: 'https://api.upbit.com/v1/orders',
      headers: { Authorization: `Bearer ${token}` },
      json: body,
    };

    return axios
      .request(options)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

//시장가 매도
const sellMarketOrder = async (ticker: string, volume: number, accessKey: string, secretKey: string) => {
  try {
    const body = {
      market: ticker,
      side: 'ask',
      volume: volume.toString(),
      ord_type: 'market',
    };

    const query = queryEncode(body);

    const hash = crypto.createHash('sha512');
    const queryHash = hash.update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, secretKey);

    const options: any = {
      method: 'POST',
      url: 'https://api.upbit.com/v1/orders',
      headers: { Authorization: `Bearer ${token}` },
      json: body,
    };

    return axios
      .request(options)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addSeconds = (date: Date, seconds: number) => {
  const result = new Date(date);
  result.setSeconds(result.getSeconds() + seconds);
  return result;
};

export default {
  tradeStating,
};

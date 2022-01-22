import User from '../models/User';
import UserService from './user-service';
import { ExchangeService, QuoationService } from 'node-upbit';
import properties from '../config/properties/properties';
import { IUser, userUniqueSearchInput } from '../interfaces/IUser';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';
import axios from "axios";
import {Response} from "express";
import { IAccount} from "../interfaces/IAccount";

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

  const targetPrice = await getTargetPrice('KRW-BTC', 0.5);
  const startTime = await getStartTime('KRW-BTC');
  const balances = await getBalance('KRW', decryptedAccessKey, decryptedSecretKey);
  const currentPrice = await getCurrentPrice('KRW-BTC');

  /*balances.map((item: IAccount, index: number) => {
    if (item.currency == ticker) {
      if (item.balance !== null) {
        return item.balance;
      } else {
        return 0;
      }
    }
  });*/
  /*while (status || false) {
    try {
      const now = new Date();
      const tomorrow = new Date();
      const startTime = await getStartTime('KRW-BTC');
      const endTime = startTime + tomorrow.setDate(now.getDate() + 1);

    } catch (error) {
      
    }
  }*/
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
const getBalance = async (ticker: string, decryptedAccessKey: string, decryptedSecretKey: string) => {
  const payload = {
    access_key: decryptedAccessKey,
    nonce: uuidv4(),
  };

  const token = sign(payload, decryptedSecretKey);
  const options: any = {
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

  return quoationService.getOrderbook([ticker]);
};

export default {
  tradeStating,
};

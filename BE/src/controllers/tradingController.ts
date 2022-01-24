import axios from 'axios';
import CryptoJS from 'crypto-js';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import properties from '../config/properties/properties';
import { UserService } from '../services';

const changeResponse = async (data: any) => {
  interface resultType {
    krw: number; // 보유 원화
    totalMoney: number; // 총 매수금액
    coinList: any; // 보유코인/현재금액
  }
  interface coinListType {
    string: {
      // coin name flag
      name: string; // coin name
      currency: string; // coin flag
      avgBuyPrice: string; // 매수 평균가
      entryPrice: number; // 총 매수 금액
      currentTradePrice: number; // 해당 코인 현재가
      quantity: string; // 코인 보유수량
      currentValuePrice: number; // 평가 금액
      earningRate: number; // 수익률
    };
  }
  const coinList: any = {};

  let money: number = parseFloat(data[0].balance);

  for (let i = 1; i < data.length; i++) {
    const temp: any = {};
    money += parseFloat(data[i]['balance']) * parseFloat(data[i]['avg_buy_price']);
    // coinList[data[i]['unit_currency'] + '-' + data[i]['currency']] = 0;
    temp['name'] = data[i]['currency'];
    temp['currency'] = data[i]['unit_currency'] + '-' + data[i]['currency'];
    temp['avgBuyPrice'] = data[i]['avg_buy_price'];
    temp['quantity'] = data[i]['balance'];
    temp['entryPrice'] = parseFloat(data[i]['balance']) * parseFloat(data[i]['avg_buy_price']);
    coinList[temp['currency']] = temp;
  }
  const coinArr = Object.keys(coinList);

  for (let i = 0; i < coinArr.length; i++) {
    const currentPrice: any = await getCurrentCoinInfos(coinArr[i]);
    coinList[coinArr[i]]['trade_price'] = currentPrice[0]['trade_price'];
    coinList[coinArr[i]]['currentValuePrice'] =
      currentPrice[0]['trade_price'] * parseFloat(coinList[coinArr[i]]['quantity']);
    coinList[coinArr[i]]['earningRate'] = (
      (coinList[coinArr[i]]['currentValuePrice'] / parseFloat(coinList[coinArr[i]]['entryPrice']) - 1) *
      100
    ).toFixed(2);
  }

  const totalMoney: number = money;
  const result: resultType = {
    krw: parseInt(data[0].currency), // 보유 원화
    totalMoney, // 총 매수금액
    coinList, // 코인 관련 전체
  };
  return result;
};

const getCurrentCoinInfos = (name: string) => {
  const options: any = {
    method: 'GET',
    url: 'https://api.upbit.com/v1/ticker',
    headers: { Accept: 'application/json' },
    params: { markets: name },
  };
  // 비동기로 해결
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.error(error);
      });
  });
};

const getMyUpbitAccountInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email }: any = req.query;
    // const email = 'dongwon@likelion.org';

    const user: any = await UserService.findEmail({ email });

    const { secretKey, accessKey, strategy }: any = user;
    const bytes = CryptoJS.AES.decrypt(accessKey, properties.upbitEncryptKey);
    const decryptedAccessKey = bytes.toString(CryptoJS.enc.Utf8);

    const payload = {
      access_key: decryptedAccessKey,
      nonce: uuidv4(),
    };

    const tmp = CryptoJS.AES.decrypt(secretKey, properties.upbitEncryptKey);
    const decryptedSecretKey = tmp.toString(CryptoJS.enc.Utf8);
    const token = sign(payload, decryptedSecretKey);

    const options: any = {
      method: 'GET',
      url: 'https://api.upbit.com/v1/accounts',
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .request(options)
      .then(async function (response: any) {
        const coinInfo = await changeResponse(response.data);
        res.status(200).json({
          upbit_accounts: response.data,
          coinInfo,
          strategy,
          status: 'success',
          code: 200,
          msg: 'Get Upbit account information successfully.',
        });
      })
      .catch(function (error: Error) {
        res.status(417).json({
          status: 'failure',
          code: 417,
          msg: 'https://api.upbit.com/v1/accounts get falied',
        });
      });
  } catch (err) {
    next(err);
  }
};

export default {
  getMyUpbitAccountInfo,
};

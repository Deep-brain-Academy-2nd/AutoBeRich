import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import { sign } from 'jsonwebtoken';
import { QuoationService } from 'node-upbit';
import { encode as queryEncode } from 'querystring';
import rp from 'request-promise';
import { v4 as uuidv4 } from 'uuid';
import properties from '../config/properties/properties';
import { IAccount } from '../interfaces/IAccount';
import { IUser, userUniqueSearchInput } from '../interfaces/IUser';
import UserService from './userService';
import axios from 'axios';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const autoTradingStart = async (data: userUniqueSearchInput) => {
  // 로그인하고 코인 구매가 가능한 정보 가져오기 :: 2022-01-14 dongwon
  const { email } = data;
  const user: IUser | null = await UserService.findEmail({ email });

  // @ts-ignore
  const { secretKey, accessKey, status }: IUser = user;
  const bytes = CryptoJS.AES.decrypt(accessKey, properties.upbitEncryptKey);
  const decryptedAccessKey = bytes.toString(CryptoJS.enc.Utf8);
  const tmp = CryptoJS.AES.decrypt(secretKey, properties.upbitEncryptKey);
  const decryptedSecretKey = tmp.toString(CryptoJS.enc.Utf8);

  // 자동 매매 시작 :: 2022-01-24 dongwon
  function timer() {
    setTimeout(async () => {
      const user: IUser | null = await UserService.findEmail({ email });
      // @ts-ignore
      const { status }: IUser = user;
      if (status) {
        autoTrading(decryptedAccessKey, decryptedSecretKey, user);
        timer();
      }
    }, 7000);
  }
  if (status) {
    timer();
  }
};

// 자동 매매 함수 분리 :: 2022-01-24 dongwon
const autoTrading = async (decryptedAccessKey: string, decryptedSecretKey: string, user: IUser | null) => {
  try {
    // ***** 테스트 위해서 여기 시간조정 getStartTime, getTime, addSeconds 등으로 가서 조절 :: dongwon
    const now = new Date(); // 현재시간
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 59, 50);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);

    //매도
    if (startTime <= now && now <= endTime) {
      const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
      const btc = balances.find((item: IAccount) => {
        return item.currency === 'BTC';
      });
      // 5천원이상이면 매도. 현재 비트코인 가격상 0.00008이 5천원임. :: 2022-01-24 dongwon
      if (btc.balance > 0.00008) {
        console.log(user?.name + ' 매도 시작 ==========  ' + new Date());
        await sellMarketOrder('KRW-BTC', btc.balance * 0.9995, decryptedAccessKey, decryptedSecretKey);
      }
      //여기에 구글 시트 추가
      writeExcelSeet(decryptedAccessKey, decryptedSecretKey, user);
    } else {
      //매수
      const targetPrice = await getTargetPrice('KRW-BTC', 0.5); // 매수 목표가 설정
      const currentPrice = await getCurrentPrice('KRW-BTC'); // 현재 가격

      console.log('KRW_BTC 목표가격 ========== ' + targetPrice);
      console.log('KRW_BTC 현재가격 ========== ' + currentPrice);

      // 현재가격이 매수 목표가 보다 높을시 매수
      if (targetPrice < currentPrice) {
        // 계좌 조회
        const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
        // 보유 원화 조회
        const krw = balances.find((item: IAccount) => {
          return item.currency === 'KRW';
        });
        console.log('KRW 보유 원화 ========== ' + krw.balance);
        // 5천원 이상이면 매수
        if (krw.balance > 5000) {
          // 수수료 0.0005%라 남겨두고 구매
          console.log(user?.name + ' 총금액 ========== ' + krw.balance * 0.9995 + ' 매수 ', new Date());
          buyMarketOrder('KRW-BTC', krw.balance * 0.9995, decryptedAccessKey, decryptedSecretKey);
        }
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
  // 이전 종가보다 현재 낙폭이 *k배가 목표 가격.
  const targetPrice = df[0].prev_closing_price + (df[0].high_price - df[0].low_price) * k;
  return targetPrice;
};

// 시작 시간 조회
const getStartTime = async (ticker: string) => {
  const quoationService = new QuoationService();
  // getDayCandles로 조회하면 시작시간이 9시임 :: 2022-01-24 dongwon
  const df = await quoationService.getDayCandles({
    marketCoin: ticker,
    count: 1,
  });

  const startTime = new Date(df[0].candle_date_time_utc).getTime();
  return startTime;
};

// 잔고 조회
const getBalance = async (decryptedAccessKey: string, decryptedSecretKey: string) => {
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
    let result: any = {};
    try {
      result = await rp(options);
    } catch (error) {
      console.error(error);
    }

    return result;
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

    let result: any = {};
    try {
      result = await rp(options);
    } catch (error) {
      console.error(error);
    }
    return result;
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

const writeExcelSeet = async (decryptedAccessKey: string, decryptedSecretKey: string, user: IUser | null) => {
  const doc = new GoogleSpreadsheet('19rg6IKaNH2jmmJxOroO5iwmcCy_pTySHKubRW04h4Xw');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const credentials = require('../../autoberich-028e930e0489.json');
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
  let docSheet = doc.sheetsByTitle[user?.email || ''];
  if (docSheet == null) {
    docSheet = await doc.addSheet({ title: user?.email });

    await docSheet.loadCells('A1:E1'); // loads a range of cells
    const a1 = docSheet.getCell(0, 0); // access cells using a zero-based index
    const b1 = docSheet.getCellByA1('B1'); // or A1 style notation
    const c1 = docSheet.getCellByA1('C1');
    const d1 = docSheet.getCellByA1('D1');
    const e1 = docSheet.getCellByA1('E1');
    // access everything about the cell
    // update the cell contents and formatting
    a1.value = 'name';
    a1.textFormat = { bold: true };
    b1.value = 'email';
    b1.textFormat = { bold: true };
    c1.value = 'date';
    c1.textFormat = { bold: true };
    d1.value = 'KRW';
    d1.textFormat = { bold: true };
    e1.value = 'earning_rate';
    e1.textFormat = { bold: true };
    await docSheet.saveUpdatedCells();
    const initBalances = await getBalance(decryptedAccessKey, decryptedSecretKey);
    // 보유 원화 조회
    const krw = initBalances.find((item: IAccount) => {
      return item.currency === 'KRW';
    });
    const row = await docSheet.addRow({
      name: user?.name || '',
      email: user?.email || '',
      date: new Date().toString(),
      KRW: parseInt(krw.balance) || -1,
      earning_rate: 'There is no record, so the rate of return cannot be calculated.',
    });
  }

  const balances = await getBalance(decryptedAccessKey, decryptedSecretKey);
  // 보유 원화 조회
  const krw = balances.find((item: IAccount) => {
    return item.currency === 'KRW';
  });
  const currentRows = await docSheet.getRows();
  const rowCount = currentRows.length;
  const exHaveKrw = currentRows[rowCount - 1].KRW;
  const row = await docSheet.addRow({
    name: user?.name || '',
    email: user?.email || '',
    date: new Date().toString(),
    KRW: parseInt(krw.balance) || -1,
    earning_rate: (parseInt(krw.balance) / exHaveKrw) * 100 - 100 + '%',
  });
};

const getRor = async (ticker: string, k: number) => {
  const quoationService = new QuoationService();
  const df = await quoationService.getDayCandles({
    marketCoin: ticker,
    count: 7,
  });
};

export default {
  autoTradingStart,
};

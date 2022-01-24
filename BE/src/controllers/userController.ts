import axios from 'axios';
import bcrypt, { compare } from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt, { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import properties from '../config/properties/properties';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { TradeService, UserService } from '../services';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, secretKey, accessKey }: IUserInputDTO = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'failure',
        code: 400,
        msg: errors.array()[0].msg,
      });
    }

    const foundUser = await UserService.findEmail({ email });
    if (foundUser) {
      res.status(409).send({
        status: 'failure',
        code: 401,
        msg: 'This ID is already in use.',
      });
    } // 이미 가입한 유저

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const key = properties.upbitEncryptKey;
    const encryptedSecretKey = CryptoJS.AES.encrypt(secretKey, key).toString();
    const encryptedAccessKey = CryptoJS.AES.encrypt(accessKey, key).toString();

    const createdUser = await UserService.createUser({
      name,
      email,
      password: hashedPassword,
      accessKey: encryptedAccessKey,
      secretKey: encryptedSecretKey,
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      msg: 'sign up successful',
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await UserService.findEmail({ email });

    if (!user) {
      //해당 이메일 주소 없음.
      res.status(401).send({
        status: 'failure',
        code: 401,
        msg: 'email not exist',
      });
      return;
    }

    const result = await compare(password, user.password);
    if (!result) {
      //비밀번호 불일치.
      res.status(401).send({
        status: 'failure',
        code: 401,
        msg: 'password incorrect',
      });
      return;
    }

    //유저 정보를 가지고 토큰을 만들어낸다.
    jwt.sign(
      {
        email: email,
      },
      properties.jwtSecret,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        // @ts-ignore

        // @ts-ignore
        res.status(200).json({
          status: 'success',
          code: 200,
          msg: 'Login successful.',
          token: token,
          email: user.email,
          name: user.name,
        });
      }
    );

    //복호화
    //const bytes = CryptoJS.AES.decrypt(user.secretKey, key);
    //const decryptedSecretKey = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['x-access-token']) {
      return res.status(403).json({
        status: 'failure',
        code: 403,
        msg: 'not logged in',
      });
    }

    const token: string = req.headers['x-access-token'].toString();
    const secret_key = properties.jwtSecret;

    // token does not exist
    if (!token) {
      return res.status(403).json({
        status: 'failure',
        code: 403,
        msg: 'not logged in',
      });
    }

    //토큰을 검증한다.
    const decoded: any = jwt.verify(token, secret_key);

    if (decoded) {
      /*res.locals = {
        ...res.locals,
        email: decoded.email,
      };*/
      next();
    } else {
      res.status(401).json({
        status: 'failure',
        code: 401,
        msg: 'unauthorized',
      });
    }
  } catch (err) {
    next(err);
  }
};

const accountInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    // @ts-ignore
    const user: IUser | null = await UserService.findEmail({ email });

    // @ts-ignore
    const { secretKey, accessKey, strategy } = user;
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(accessKey, properties.upbitEncryptKey);
    const decryptedAccessKey = bytes.toString(CryptoJS.enc.Utf8);

    const payload = {
      access_key: decryptedAccessKey,
      nonce: uuidv4(),
    };

    // @ts-ignore
    const tmp = CryptoJS.AES.decrypt(secretKey, properties.upbitEncryptKey);
    const decryptedSecretKey = tmp.toString(CryptoJS.enc.Utf8);
    const token = sign(payload, decryptedSecretKey);

    const options = {
      method: 'GET',
      url: 'https://api.upbit.com/v1/accounts',
      headers: { Authorization: `Bearer ${token}` },
    };

    // @ts-ignore
    axios
      // @ts-ignore
      .request(options)
      // @ts-ignore
      .then(function (response: Response) {
        // @ts-ignore
        res.status(200).json({
          // @ts-ignore
          upbit_accounts: response.data,
          strategy: strategy,
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

const updateTradingStrategy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, strategy } = req.body;
    await UserService.updateTradingStrategy({ email, strategy });
    res.status(200).json({
      status: 'success',
      code: 200,
      msg: 'Update traiding strategy successful.',
    });
  } catch (err) {
    next(err);
  }
};

const updateStatusAutoTrading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, status } = req.body;

    // 자동 매매 상태 변경
    await UserService.updateStatusAutoTrading({ email, status });

    // // 자동 매매 시작
    // startAutoTrading(email);

    res.status(200).json({
      status: 'success',
      code: 200,
      msg: 'Update traiding status successful.',
    });
  } catch (err) {
    next(err);
  }
};

const startAutoTrading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    // 자동 매매 시작
    await TradeService.tradeStating({ email });

    res.status(200).json({
      status: 'success',
      code: 200,
      msg: 'start auto trading',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signUp,
  logIn,
  verifyToken,
  accountInfo,
  updateTradingStrategy,
  updateStatusAutoTrading,
  startAutoTrading,
};

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
import User from "../models/User";
import {IRefreshToken} from "../interfaces/IRefreshToken";

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

    const accessToken = jwt.sign({}, properties.jwtSecret, { expiresIn: '1h' });
    //유저 정보를 가지고 토큰을 만들어낸다.
    const refreshToken = jwt.sign({}, properties.jwtSecret, { expiresIn: '60d' });

    await UserService.insertRefreshToken({
      email: email,
      refreshToken: refreshToken,
      date: new Date(),
    });

    const date = new Date();
    date.setMonth(date.getHours() + 1);
    res.status(200).json({
      status: 'success',
      code: 200,
      msg: 'Login successful.',
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiredTime: date.getTime(), // 한시간
      email: user.email,
      name: user.name,
    });

    return;
  } catch (err) {
    next(err);
  }
};

const verifyToken = (token: string | string[]) => {
  try {
    // @ts-ignore
    return jwt.verify(token, properties.jwtSecret);
  } catch (e) {
    return null;
  }
};

const checkTokens = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * access token 자체가 없는 경우엔 에러(401)를 반환
   *  클라이언트측에선 401을 응답받으면 로그인 페이지로 이동시킴
   **/
  const { email, refreshToken } = req.body;

  if (!req.headers['x-access-token']) {
    return res.status(403).json({
      status: 'failure',
      code: 403,
      msg: 'not logged in',
    });
  }
  const access_token = req.headers['x-access-token'];
  if (access_token === undefined) throw Error('API 사용 권한이 없습니다.');
  const accessToken = verifyToken(access_token);
  const refreshTokenTmp: IRefreshToken | null = await UserService.checkRefreshToken({
    email: email,
    refreshToken: refreshToken,
  });
  if (accessToken === null) {
    if (refreshTokenTmp === undefined) {
      // case1: access token과 refresh token 모두가 만료된 경우
      throw Error('API 사용 권한이 없습니다.');
    } else {
      // case2: access token은 만료됐지만, refresh token은 유효한 경우
      /**
       * DB를 조회해서 payload에 담을 값들을 가져오는 로직
       */
      const refreshTokenVerify = verifyToken(refreshTokenTmp?.refreshToken || '');
      if (refreshTokenVerify == null) {
        return res.status(200).json({
          status: 'success',
          code: 206,
          msg: 'refreshToken expired',
        });
      }
      const newAccessToken = jwt.sign({}, properties.jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({
        status: 'success',
        code: 201,
        accessToken: newAccessToken,
        msg: 'new access token sign up',
      });
    }
  } else {
    if (refreshTokenTmp === undefined) {
      // case3: access token은 유효하지만, refresh token은 만료된 경우
      const newRefreshToken = jwt.sign({}, properties.jwtSecret, { expiresIn: '60d' });

      await UserService.insertRefreshToken({
        email: email,
        refreshToken: newRefreshToken,
        date: new Date(),
      });

      return res.status(200).json({
        status: 'success',
        code: 200,
        msg: 'new refresh token sign up',
      });
    } else {
      // case4: accesss token과 refresh token 모두가 유효한 경우
      return res.status(200).json({
        status: 'success',
        code: 200,
        msg: 'verify token success',
      });
    }
  }
};

/*const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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
      /!*res.locals = {
        ...res.locals,
        email: decoded.email,
      };*!/
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
};*/

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

const updateStatusAutoTraiding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, status } = req.body;

    await UserService.updateStatusAutoTrading({ email, status });
    // 자동 매매 시작
    // status false 이면 db에 status 값만 false로 바꿔주면 기존에 돌던 애가 멈춘다. false 일 때 autoTradingStart를 돌려줄 필요가 없다
    if (status) {
      await TradeService.autoTradingStart({ email, status });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      msg: 'start auto trading',
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req: Request, res: Response, next: NextFunction) => {
  const { email, refreshToken } = req.body;

  await UserService.deleteRefreshToken({ email, refreshToken });
};

export default {
  signUp,
  logIn,
  accountInfo,
  updateTradingStrategy,
  updateStatusAutoTraiding,
  checkTokens,
  logOut,
};

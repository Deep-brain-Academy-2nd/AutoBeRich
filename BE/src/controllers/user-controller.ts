import express, {NextFunction, request, Request, Response} from 'express';
import bcrypt, { compare } from 'bcryptjs';
import jwt, { sign } from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { UserService } from '../services';
import properties from '../config/properties/properties';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

    const key = properties.key;
    const encryptedSecretKey = CryptoJS.AES.encrypt(secretKey, key).toString();
    const encryptedAccessKey = CryptoJS.AES.encrypt(accessKey, key).toString();

    const createdUser = await UserService.createUser({
      name,
      email,
      password: hashedPassword,
      accessKey: encryptedAccessKey,
      secretKey: encryptedSecretKey,
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
        req.session.secret = user.secretKey;
        // @ts-ignore
        req.session.access = user.accessKey;
        res.status(200).json({
          status: 'success',
          code: 200,
          msg: 'Login successful.',
          token: token,
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
    res.status(401).json({
      status: 'failure',
      code: 401,
      msg: 'not logged in',
    });
  }
};

const accountInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //const { email } = { email: 'cde@test.com' };

    //const user: IUser | null = await UserService.findEmail({ email });
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(req.session.access, properties.key);
    const decryptedAccessKey = bytes.toString(CryptoJS.enc.Utf8);

    const payload = {
      access_key: decryptedAccessKey,
      nonce: uuidv4(),
    };

    // @ts-ignore
    const tmp = CryptoJS.AES.decrypt(req.session.secret, properties.key);
    const decryptedSecretKey = tmp.toString(CryptoJS.enc.Utf8);
    const token = sign(payload, decryptedSecretKey);

    const options = {
      method: 'GET',
      url: 'https://api.upbit.com/v1/accounts',
      headers: { Authorization: `Bearer ${token}` },
    };

    // @ts-ignore
    res = request(options, (error: any, response: any, body: any) => {
      if (error) throw new Error(error);
      console.log(body);
    });

    /*// @ts-ignore
    axios
      // @ts-ignore
      .request(options)
      // @ts-ignore
      .then(function (response: Response) {
        // @ts-ignore
        console.log(response.data);
        // @ts-ignore
        res.status(200).json({ obj: response.data });
      })
      .catch(function (error: Error) {
        console.error(error);
        res.status(417).json({ msg: error });
      });*/
  } catch (err) {
    res.status(417).json({ msg: 'Failed to get my account information from Upbit.' });
  }
};

export default {
  signUp,
  logIn,
  verifyToken,
  accountInfo,
};

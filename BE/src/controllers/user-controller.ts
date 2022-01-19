import express, { NextFunction, Request, Response } from 'express';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { UserService } from '../services';
import properties from '../config/properties/properties';
import CryptoJS from 'crypto-js';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, secretKey, accessKey }: IUserInputDTO = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const foundUser = await UserService.findEmail({ email });
    if (foundUser) {
      res.status(409).send({ msg: 'This ID is already in use.' });
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
      res.status(400).send({ msg: 'email not exist' });
      return;
    }

    const result = await compare(password, user.password);
    if (!result) {
      //비밀번호 불일치.
      res.status(400).send({ msg: 'password incorrect' });
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
        res.json({
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
        success: false,
        msg: 'not logged in',
      });
    }

    const token: string = req.headers['x-access-token'].toString();
    const secret_key = properties.jwtSecret;

    // token does not exist
    if (!token) {
      return res.status(403).json({
        success: false,
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
      res.status(401).json({ msg: 'unauthorized' });
    }
  } catch (err) {
    res.status(401).json({ msg: 'token expired' });
  }
};

export default {
  signUp,
  logIn,
  verifyToken,
};

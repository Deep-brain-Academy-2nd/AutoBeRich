import express, { NextFunction, Request, Response } from 'express';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import errorGenerator from '../errors/error-generator';
import { body, validationResult } from 'express-validator';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { UserService } from '../services';
import properties from '../config/properties/properties';
import AES from 'crypto-js/aes';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, secretKey, accessKey }: IUserInputDTO = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const foundUser = await UserService.findEmail({ email });
    if (foundUser) errorGenerator({ statusCode: 409 }); // 이미 가입한 유저

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const key = properties.key;

    const encryptedSecretKey = AES.encrypt(secretKey, key).toString();
    const encryptedAccessKey = AES.encrypt(accessKey, key).toString();

    //복호환
    //var decryptedData = JSON.parse(encryptedSecretKey.toString(CryptoJS.enc.Utf8));

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
    const { email, password } = req.body.obj;

    const user: IUser | null = await UserService.findEmail({ email });

    if (!user) {
      //해당 이메일 주소 없음.
      //res.status(400).send('email not exist');
      errorGenerator({ msg: 'email not exist', statusCode: 400 });
      return;
    }

    const result = await compare(password, user.password);
    if (!result) {
      //비밀번호 불일치.
      //res.status(400).send('password incorrect');
      errorGenerator({ msg: 'password incorrect', statusCode: 400 });
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
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['x-access-token']) {
      return res.status(403).json({
        success: false,
        message: 'not logged in',
      });
    }

    const token: string = req.headers['x-access-token'].toString();
    const secret_key = properties.jwtSecret;

    // token does not exist
    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'not logged in',
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
      //res.status(401).json({ error: 'unauthorized' });
      errorGenerator({ msg: 'unauthorized', statusCode: 401 });
    }
  } catch (err) {
    res.status(401).json({ error: 'token expired' });
  }
};

export default {
  signUp,
  logIn,
  verifyToken,
};

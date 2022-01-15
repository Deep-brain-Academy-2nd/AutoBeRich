import express, { NextFunction, Request, Response } from "express";
import bcrypt, {compare} from "bcryptjs";
import jwt from "jsonwebtoken";
import errorGenerator from "../errors/error-generator";
import { check, validationResult } from "express-validator";
import {IUser, IUserInputDTO, userUniqueSearchInput} from "../interfaces/IUser";
import { UserService } from "../services";
import properties from "../config/properties/properties";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    check("name", "Name is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 });
    const { name, email, password } : IUserInputDTO = req.body;
    try{
        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findEmail({ email });
        if(foundUser)   errorGenerator({ statusCode: 409 });  // 이미 가입한 유저

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await UserService.createUser({ name, email, password: hashedPassword });

    } catch (err) {
        next(err);
    }
};

const logIn = async  (req: Request, res: Response, next: NextFunction) => {

    try{
        let email: userUniqueSearchInput = req.body.email;
        let password: string = req.body.password;

        const user: IUser | null = await UserService.findEmail(email);
        if(!user) {
            //해당 이메일 주소 없음.
            //res.status(400).send('email not exist');
            errorGenerator({msg:'email not exist', statusCode:400});
            return;
        }

        const result = await compare(password, user.password);
        if(!result) {
            //비밀번호 불일치.
            //res.status(400).send('password incorrect');
            errorGenerator({msg: 'password incorrect', statusCode: 400});
            return;
        }

        //유저 정보를 가지고 토큰을 만들어낸다.
        jwt.sign(
            {
                email: email
            },
            properties.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    name: user.name,
                    token: token,
                });
            }
        );

    }catch(err) {
        res.status(400).send('login error');
    }

};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.headers['x-access-token']) {
            return res.status(403).json({
                success: false,
                message: 'not logged in'
            })
        }

        const token: string = req.headers['x-access-token'].toString();
        const secret_key = process.env.SECRET_KEY || 'secret_key';

        // token does not exist
        if(!token) {
            return res.status(403).json({
                success: false,
                message: 'not logged in'
            })
        }

        //토큰을 검증한다.
        const decoded: any = jwt.verify(token, secret_key);

        if (decoded) {
            res.locals = {
                ...res.locals,
                email: decoded.email,
            }
            next();
        } else {
            //res.status(401).json({ error: 'unauthorized' });
            errorGenerator( { msg:'unauthorized', statusCode:401 })
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};

export default {
    signUp,
    logIn,
    verifyToken,
}
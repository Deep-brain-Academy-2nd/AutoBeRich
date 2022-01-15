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
            res.status(400).send('email not exist');
            return;
        }

        const result = await compare(password, user.password);
        if(!result) {
            //비밀번호 불일치.
            res.status(400).send('password incorrect');
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

export default {
    signUp,
    logIn,
}
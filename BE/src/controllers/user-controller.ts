import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorGenerator from "../errors/errorGenerator";
import { check, validationResult } from "express-validator";
import { IUserInputDTO } from "../interfaces/IUser";
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

        const payload = {
            user: {
                email: createdUser.email,
            },
        };
        jwt.sign(
            payload,
            properties.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        next(err);
    }
};

export default {
    signUp,
    //logIn
}
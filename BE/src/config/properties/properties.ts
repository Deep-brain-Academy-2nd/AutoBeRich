import dotenv from "dotenv";

dotenv.config();

export default {
    port: parseInt(process.env.PORT!, 10),

    mongoURL: process.env.MONGO_URL,

    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

};
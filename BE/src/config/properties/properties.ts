import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 5000,

    mongoURL: process.env.MONGO_URL || "",

    //JWT
    jwtSecret: process.env.JWT_SECRET || "",
    jwtAlgorithm: process.env.JWT_ALGO || "",

    //업비트
    upbitOpenApiAccessKey : process.env.UPBIT_OPEN_API_ACCESS_KEY || "",
    upbitOpenApiSecretKey : process.env.UPBIT_OPEN_API_SECRET_KEY || "",
};
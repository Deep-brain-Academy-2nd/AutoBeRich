import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 5000,

    mongoURL: process.env.MONGO_URL || "",

    jwtSecret: process.env.JWT_SECRET || "",
    jwtAlgorithm: process.env.JWT_ALGO || "",

};
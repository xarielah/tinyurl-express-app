import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export const redisConfig = {
  uri: process.env.REDIS_URI,
};

import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export const mongoConfig = {
  uri: process.env.MONGODB_URI!,
};

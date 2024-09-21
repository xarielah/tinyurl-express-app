import dotenv from "dotenv";
import { type Algorithm } from "jsonwebtoken";
import path from "path";
dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export const jwtConfig = {
  secret: process.env.JWT_SECRET!,
  algorithm: "HS256" as Algorithm,
};

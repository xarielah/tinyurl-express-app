import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { authController } from "./controllers/auth/auth.controller";
import { redirectController } from "./controllers/redirect/redirect.controller";
import { shortenController } from "./controllers/shorten/shorten.controller";
import { statisticsController } from "./controllers/statistics/statistics.controller";
import { connectMongoClient } from "./lib/mongo/client";
import { connectRedisClient } from "./lib/redis/connect-client";
dotenv.config({
  path: path.join(__dirname, "../.env"),
});
const app = express();

// Connect Redis Client
connectRedisClient();
connectMongoClient();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Controllers
app.use("/api/auth", authController);
app.use("/api/shorten", shortenController);
app.use("/api/stats", statisticsController);
app.use("/api/redirect", redirectController);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { authController } from "./controllers/auth/auth.controller";
import { redirectController } from "./controllers/redirect/redirect.controller";
import { shortenController } from "./controllers/shorten/shorten.controller";
import { statisticsController } from "./controllers/statistics/statistics.controller";
import { isDevelopment } from "./lib/config/environment.config";
import { connectMongoClient } from "./lib/mongo/client";
import { connectRedisClient } from "./lib/redis/connect-client";
dotenv.config();
const app = express();

// Connect Redis Client
connectRedisClient();
connectMongoClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO (Not final):
// # For each controller register an auth middleware.
// # For redirect controller register a middleware that finds that adds any statistics before redirecting.
// # For statistics controller register a middleware that finds the needed statistics for a given redirectId.

// Controllers
app.use("/api/auth", authController);
app.use("/api/shorten", shortenController);
app.use("/api/stats", statisticsController);
app.use("/api/redirect", redirectController);

if (!isDevelopment()) {
  app.use(cors);
}

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

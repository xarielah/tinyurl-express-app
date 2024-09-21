import express from "express";
import { authController } from "./controllers/auth/auth.controller";
import { redirectController } from "./controllers/redirect/redirect.controller";
import { shortenController } from "./controllers/shorten/shorten.controller";
import { statisticsController } from "./controllers/statistics/statistics.controller";
const app = express();
app.use(express.json());

// TODO (Not final):
// # For each controller register an auth middleware.
// # For redirect controller register a middleware that finds that adds any statistics before redirecting.
// # For statistics controller register a middleware that finds the needed statistics for a given redirectId.

// Controllers
app.use("/api/auth", authController);
app.use("/api/shorten", shortenController);
app.use("/api/statistics", statisticsController);
app.use("*", redirectController);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

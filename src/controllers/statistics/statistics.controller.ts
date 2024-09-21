import express from "express";
const route = express.Router();

route.get(":redirectId", (req, res) => {
  return res.send("Hello World");
});

export { route as statisticsController };

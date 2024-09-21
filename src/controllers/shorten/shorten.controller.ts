import express from "express";
const route = express.Router();

route.post("/", (req, res) => {
  return res.send("Hello World");
});

export { route as shortenController };

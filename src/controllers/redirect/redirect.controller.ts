import express from "express";
const route = express.Router();

// :shortId
route.get(":shortId", (req, res) => {
  return res.send("Hello World");
});

export { route as redirectController };

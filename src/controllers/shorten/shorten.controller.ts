import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  return res.send("Hello World");
});

export { router as shortenController };

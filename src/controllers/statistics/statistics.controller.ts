import express from "express";
const router = express.Router();

router.get(":redirectId", (req, res) => {
  return res.send("Hello World");
});

export { router as statisticsController };

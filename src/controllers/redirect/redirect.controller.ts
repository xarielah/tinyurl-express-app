import express from "express";
import * as redirectRepository from "../../repositories/redirect.repository";
const router = express.Router();

// :shortId
router.get(":shortId", (req, res) => {
  return res.send("Hello World");
});

router.get("/", (req, res) => {
  return redirectRepository.setRedirectUrl("key", "url");
});

export { router as redirectController };

import { check } from "express-validator";

export const createLinkValidator = check("url")
  .isURL()
  .withMessage("URL must be a valid URL address");

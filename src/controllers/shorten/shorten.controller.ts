import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { jwtMiddlewareValidator } from "../../services/auth/jwt.service";
import * as shortenService from "../../services/shorten/shorten.service";
import { checkValidation } from "../../validators/check-validation";
import { createLinkValidator } from "../../validators/shorten-validators/create-link.validator";
const router = express.Router();

// create short link
router.post(
  "/create-new",
  jwtMiddlewareValidator,
  createLinkValidator,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const result = await shortenService.createShortURL({
      url: req.body.url,
      ownerId: req.auth.userId,
    });
    if (result)
      return res.status(201).send({
        id: result._id,
        url: result.originalUrl,
        shortId: result.shortId,
      });
  }
);

router.post(
  "/",
  jwtMiddlewareValidator,
  async (req: InternalRequest, res: Response) => {
    const result = await shortenService.getAllShotenByUserId(req.auth.userId);
    return res.status(200).send(result);
  }
);

router.delete(
  "/:shortenUrlId",
  jwtMiddlewareValidator,
  async (req: InternalRequest, res: Response) => {
    res.status(200).send("hi!");
  }
);

export { router as shortenController };

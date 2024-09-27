import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { ShortenErrors } from "../../lib/error-handling/shorten-error.type";
import { jwtMiddlewareValidator } from "../../services/auth/jwt.service";
import * as shortenService from "../../services/shorten/shorten.service";
import { checkValidation } from "../../validators/check-validation";
import { createLinkValidator } from "../../validators/shorten-validators/create-link.validator";
const router = express.Router();

// create short link
router.post(
  "/new",
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
    const { shortenUrlId: shortId } = req.params as { shortenUrlId: string };
    const owner = req.auth.userId;
    const data = { shortId, owner };
    const result = await shortenService.deleteShortenLinkById(data);
    if (result) return res.status(200).send(result);
    res.status(404).send({ message: ShortenErrors.SHORTEN_NOT_FOUND });
  }
);

export { router as shortenController };

import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { RedirectErrors } from "../../lib/error-handling/redirect-error.type";
import * as eventService from "../../services/event/event.service";
import * as redirectService from "../../services/redirect/redirect.service";
import { checkValidation } from "../../validators/check-validation";
import { getRedirectInfoValidator } from "../../validators/redirect-validators/get-redirect-info.validator";
import { RedirectPayload } from "./redirect.models";
require("dotenv").config();
const router = express.Router();

router.post(
  "/",
  getRedirectInfoValidator,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const redirect_key = req.headers ? req.headers["x-redirect-key"] : "";
    const secret_redirect_key = process.env.SECRET_REDIRECT_KEY || "";
    if (!redirect_key || redirect_key !== secret_redirect_key)
      return res
        .status(400)
        .send({ message: RedirectErrors.REDIRECT_KEY_NOT_FOUND });
    const body = req.body as RedirectPayload;
    const locationInformation = body.locationInformation;
    const shortId = body.shortId || "";
    const cacheResult = await redirectService.getRedirectUrlByKey(shortId);
    if (cacheResult) {
      eventService
        .registerVisit(shortId, locationInformation, req.params?.referer)
        .catch((err) => console.error(err.message));
      return res.status(200).send({ url: cacheResult });
    }
    const message = RedirectErrors.REDIRECT_CODE_NOT_FOUND;
    res.status(404).send({ message });
  }
);

export { router as redirectController };

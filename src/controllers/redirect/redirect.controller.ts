import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { RedirectErrors } from "../../lib/error-handling/redirect-error.type";
import * as eventService from "../../services/event/event.service";
import * as redirectService from "../../services/redirect/redirect.service";
import { checkValidation } from "../../validators/check-validation";
import { getRedirectInfoValidator } from "../../validators/redirect-validators/get-redirect-info.validator";
const router = express.Router();

// :shortId
router.post(
  "/:shortId",
  getRedirectInfoValidator,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const shortId = req.params!.shortId || "";
    const cacheResult = await redirectService.getRedirectUrlByKey(shortId);
    if (cacheResult) {
      eventService
        .registerVisit(shortId, req.ip, req.params?.referer)
        .catch((err) => console.error(err.message));
      return res.status(200).send({ url: cacheResult });
    }
    const message = RedirectErrors.REDIRECT_CODE_NOT_FOUND;
    res.status(404).send({ message });
  }
);

export { router as redirectController };

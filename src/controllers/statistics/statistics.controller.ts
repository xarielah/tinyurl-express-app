import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { jwtMiddlewareValidator } from "../../services/auth/jwt.service";
import * as eventService from "../../services/event/event.service";
import * as shortenService from "../../services/shorten/shorten.service";
const router = express.Router();

router.get(
  "/:redirectId",
  jwtMiddlewareValidator,
  async (req: InternalRequest, res: Response) => {
    try {
      const userId = req.auth.userId;
      const rid = req.params?.redirectId;
      if (!rid || !userId)
        return res.status(400).send({ message: "Invalid redirect ID" });
      const shorten = await shortenService.getUserShortenLinkByShortId(
        rid,
        userId
      );
      if (!shorten) return res.status(404).send({ message: "Not found" });
      const sid = shorten._id.toString();
      const result = await eventService.getEventsByShortId(sid);
      return res.send({
        redirectId: rid,
        result: {
          ...result,
          url: shorten.originalUrl,
          createdAt: shorten.createdAt,
        },
      });
    } catch (error) {
      return res.status(500).send({ message: "Internal error" });
    }
  }
);

export { router as statisticsController };

import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { jwtMiddlewareValidator } from "../../services/auth/jwt.service";
import * as eventService from "../../services/event/event.service";
const router = express.Router();

router.get(
  "/:redirectId",
  jwtMiddlewareValidator,
  async (req: InternalRequest, res: Response) => {
    try {
      const userId = req.auth.userId;
      const redirectId = req.params?.redirectId;
      if (!redirectId || !userId)
        return res.status(400).send({ message: "Invalid redirect ID" });
      const result = await eventService.getEventsByShortId(redirectId, userId);
      return res.send({ redirectId, result });
    } catch (error) {
      return res.status(500).send({ message: "Internal error" });
    }
  }
);

export { router as statisticsController };

import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { AuthErrors } from "../../lib/error-handling/auth-error.type";
import * as authService from "../../services/auth/auth.service";
import { loginBodyValidation } from "../../validators/auth-validators/login-user.validator";
import { registerBodyValidation } from "../../validators/auth-validators/register-user.validator";
import { tokenCookieValidator } from "../../validators/auth-validators/token-header.validator";
import { checkValidation } from "../../validators/check-validation";
const router = express.Router();

// session
router.post(
  "/session",
  tokenCookieValidator,
  checkValidation,
  (req: InternalRequest, res: Response) => {
    return res.send("Hello World");
  }
);

// login
router.post(
  "/login",
  loginBodyValidation,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const result = await authService.loginUser(req.body);
    if (!result)
      return res
        .status(401)
        .send({ message: AuthErrors.INSUFFICIENT_CREDENTIALS });

    const token = "this-is-a-token";
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.status(200).send();
  }
);

// register
router.post(
  "/register",
  registerBodyValidation,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const result = await authService.registerUser(req.body);
    if (result === null)
      return res.status(400).send({ message: AuthErrors.USER_ALREADY_EXISTS });

    return res.status(201).send();
  }
);

// forgot-password
router.post("/forgot-password", (req, res) => {
  return res.send("To be implemented");
});

// reset-password/token
router.post("/reset-password", (req, res) => {
  return res.send("To be implemented");
});

export { router as authController };

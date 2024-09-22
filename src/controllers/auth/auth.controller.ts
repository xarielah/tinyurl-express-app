import express, { CookieOptions, Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { AuthErrors } from "../../lib/error-handling/auth-error.type";
import * as userRepository from "../../repositories/user.repository";
import * as authService from "../../services/auth/auth.service";
import { jwtMiddlewareValidator } from "../../services/auth/jwt.service";
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
  jwtMiddlewareValidator,
  async (req: InternalRequest, res: Response) => {
    const user = await userRepository.getUserById(req.auth.userId);
    if (user) {
      return res.status(200).send({
        username: user.username,
        email: user.email,
      });
    }
    return res.status(404).send({ message: AuthErrors.USER_NOT_FOUND });
  }
);

const cookieOptions: CookieOptions = {
  sameSite: "none",
  secure: true,
  httpOnly: true,
};

// login
router.post(
  "/login",
  loginBodyValidation,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const result = await authService.loginUser(req.body);
    if (result) {
      res.cookie("access_token", result.access_token, cookieOptions);
      res.cookie("refresh_token", result.refresh_token, cookieOptions);
      return res.status(200).send();
    }
    return res
      .status(401)
      .send({ message: AuthErrors.INSUFFICIENT_CREDENTIALS });
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
    res.cookie("access_token", result.access_token, cookieOptions);
    res.cookie("refresh_token", result.refresh_token, cookieOptions);
    return res.status(201).json({ message: "User created successfully" });
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

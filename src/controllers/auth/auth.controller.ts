import express, { Response } from "express";
import { InternalRequest } from "express-validator/lib/base";
import { AuthErrors } from "../../lib/error-handling/auth-error.type";
import * as userRepository from "../../repositories/user.repository";
import * as authService from "../../services/auth/auth.service";
import { jwtMiddlewareValidator } from "../../services/auth/jwt.service";
import { loginBodyValidation } from "../../validators/auth-validators/login-user.validator";
import { registerBodyValidation } from "../../validators/auth-validators/register-user.validator";
import { checkValidation } from "../../validators/check-validation";
const router = express.Router();

// session
router.post(
  "/session",
  jwtMiddlewareValidator,
  async (req: InternalRequest, res: Response) => {
    const user = await userRepository.getUserById(req.auth.userId);
    if (user) {
      const { username, email } = user;
      return res.status(200).send({ username, email });
    }
    return res.status(404).send({ message: AuthErrors.USER_NOT_FOUND });
  }
);

// login
router.post(
  "/login",
  loginBodyValidation,
  checkValidation,
  async (req: InternalRequest, res: Response) => {
    const result = await authService.loginUser(req.body);
    if (result) {
      return res.status(200).json({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
      });
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
      return res.status(409).send({ message: AuthErrors.USER_ALREADY_EXISTS });
    return res.status(201).json({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    });
  }
);

// refresh-token
router.post("/refresh", async (req: InternalRequest, res: Response) => {
  const refresh_token = req.headers ? req.headers["x-auth-token"] : "";
  if (typeof refresh_token !== "string")
    return res
      .status(401)
      .send({ error: { message: AuthErrors.INVALID_REFRESH_TOKEN } });
  const result = authService.refreshToken(refresh_token);
  if (result) {
    return res.status(200).json({
      access_token: result,
    });
  }
  return res
    .status(401)
    .send({ error: { message: AuthErrors.INVALID_REFRESH_TOKEN } });
});

// logout
router.post("/logout", async (_: InternalRequest, res: Response) => {
  // TODO: Implement logout and revoke refresh token from database
  return res.status(200).send();
});

// forgot-password
router.post("/forgot-password", (req, res) => {
  return res.send("To be implemented");
});

// reset-password/token
router.post("/reset-password", (req, res) => {
  return res.send("To be implemented");
});

export { router as authController };

import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../lib/config/jwt.config";

export const jwtMiddlewareValidator = expressjwt({
  secret: jwtConfig.secret,
  algorithms: [jwtConfig.algorithm],
  getToken: (req) => req.cookies["access_token"] || req.headers["x-auth-token"],
  onExpired: (_, err) => {
    console.log(`Unauthorized: ${err.message}`);
  },
});

export function signJwt(payload: any, expiresIn?: string | number) {
  return jwt.sign(payload, jwtConfig.secret, {
    algorithm: jwtConfig.algorithm,
    expiresIn: expiresIn,
    // issuer: TODO: <get-from-config>,
    // audience: TODO: <get-from-config>,
  });
}

export function generateAccessToken(payload: { userId: string }): string {
  return signJwt(payload, "30m");
}

export function generateRefreshToken(payload: { userId: string }): string {
  return signJwt(payload, "180d");
}

export function isValidJwt(token: string) {
  try {
    jwt.verify(token, jwtConfig.secret);
    return true;
  } catch (error) {
    return false;
  }
}

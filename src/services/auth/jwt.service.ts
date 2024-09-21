import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../lib/config/jwt.config";

export const jwtMiddlewareValidator = expressjwt({
  secret: jwtConfig.secret,
  algorithms: [jwtConfig.algorithm],
});

export function signJwt(payload: any) {
  return jwt.sign(payload, jwtConfig.secret, {
    algorithm: jwtConfig.algorithm,
  });
}

export function decryptJwt(token: string) {
  return jwt.verify(token, jwtConfig.secret, {
    algorithms: [jwtConfig.algorithm],
  });
}

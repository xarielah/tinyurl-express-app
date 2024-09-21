import { checkSchema } from "express-validator";

export const tokenCookieValidator = checkSchema({
  access_token: {
    in: ["cookies"],
    isString: true,
    exists: true,
    errorMessage: "Access token cookie is required",
  },
});

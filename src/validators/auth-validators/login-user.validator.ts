import { checkSchema } from "express-validator";

export const loginBodyValidation = checkSchema(
  {
    username: {
      isString: true,
      exists: true,
      errorMessage: "Username cannot be empty",
    },
    password: {
      isString: true,
      exists: true,
      errorMessage: "Password cannot be empty",
    },
  },
  ["body"]
);

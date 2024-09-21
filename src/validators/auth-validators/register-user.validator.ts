import { checkSchema } from "express-validator";

export const registerBodyValidation = checkSchema(
  {
    username: {
      isString: true,
      exists: true,
      isLength: {
        options: { min: 3, max: 20 },
      },
      errorMessage: "Username must be between 3 and 20 characters",
    },
    email: {
      isEmail: true,
      exists: true,
      errorMessage: "Email must be a valid email address",
    },
    password: {
      isString: true,
      exists: true,
      isLength: {
        options: { min: 6, max: 20 },
      },
      errorMessage: "Password must be between 6 and 20 characters",
    },
  },
  ["body"]
);

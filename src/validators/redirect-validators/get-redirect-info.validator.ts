import { checkSchema } from "express-validator";
import { RedirectErrors } from "../../lib/error-handling/redirect-error.type";

export const getRedirectInfoValidator = checkSchema(
  {
    shortId: {
      in: ["params"],
      isString: true,
      exists: true,
      isLength: {
        options: { min: 10, max: 11 },
      },
      errorMessage: RedirectErrors.REDIRECT_CODE_INVALID,
    },
  },
  ["params"]
);

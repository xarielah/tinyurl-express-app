import { checkSchema } from "express-validator";
import { RedirectErrors } from "../../lib/error-handling/redirect-error.type";

export const getRedirectInfoValidator = checkSchema(
  {
    shortId: {
      isString: true,
      exists: true,
      isLength: {
        options: { min: 10, max: 11 },
      },
      errorMessage: RedirectErrors.REDIRECT_CODE_INVALID,
    },
    locaitonInformation: {
      optional: true,
      isObject: true,
      custom: {
        options: (value) => {
          const { country, countryRegion, latitude, longitude, flag } = value;
          if (country && countryRegion && latitude && longitude && flag) {
            return true;
          }
          return false;
        },
        errorMessage: RedirectErrors.REDIRECT_LOCATION_INFORMATION_INVALID,
      },
    },
  },
  ["body"]
);

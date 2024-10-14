export enum RedirectErrors {
  REDIRECT_CODE_NOT_FOUND = "Redirect code or short id did not match any records",
  REDIRECT_CODE_INVALID = "Redirect code must exist in request and be between 10-11 characters long",
  REDIRECT_LOCATION_INFORMATION_INVALID = "Location information must include country, country region, latitude, longitude, and flag",
}

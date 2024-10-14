export interface LocationInformationPayload {
  country?: string;
  countryRegion?: string;
  latitude?: string;
  longitude?: string;
  flag?: string;
}

export interface RedirectPayload {
  shortId: string;
  locationInformation: LocationInformationPayload;
}

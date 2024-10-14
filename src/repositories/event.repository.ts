import { LocationInformationPayload } from "../controllers/redirect/redirect.models";
import { eventModel } from "../database/models/event.model";

export function addVisitEvent(
  shortObjectId: string,
  location: LocationInformationPayload,
  referer?: string
) {
  return eventModel.create({
    shortLinkId: shortObjectId,
    visitorCountry: location.country,
    visitorCountryRegion: location.countryRegion,
    visitorLatitude: location.latitude,
    visitorLongitude: location.longitude,
    visitorFlag: location.flag,
    referer,
    eventTimeStamp: Date.now(),
  });
}

export function getEventsByShortId(shortId: string) {
  return eventModel.find({ shortLinkId: shortId });
}

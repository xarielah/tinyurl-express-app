import { LocationInformationPayload } from "../../controllers/redirect/redirect.models";
import * as eventRepository from "../../repositories/event.repository";
import { addVisitEvent } from "../../repositories/event.repository";
import * as shortenService from "../../services/shorten/shorten.service";

export async function registerVisit(
  shortId: string,
  location: LocationInformationPayload,
  referer?: string
) {
  const shortenedUrl = await shortenService.getShortenLinkByShortId(shortId);
  if (!shortenedUrl) return;
  return addVisitEvent(shortenedUrl._id.toString(), location, referer);
}

export async function getEventsByShortId(sid: string) {
  const events = await eventRepository.getEventsByShortId(sid);
  const count = events.length;
  const locations = events.reduce<Record<string, number>>((acc, event) => {
    if (event.visitorCountry) {
      if (acc[event.visitorCountry]) {
        acc[event.visitorCountry] += 1;
      } else {
        acc[event.visitorCountry] = 1;
      }
    }
    return acc;
  }, {});
  const eventsDto = events.map((event) => ({
    country: event.visitorCountry,
    countryRegion: event.visitorCountryRegion,
    latitude: event.visitorLatitude,
    longitude: event.visitorLongitude,
    flag: event.visitorFlag,
    referer: event.referer,
    timestamp: event.eventTimeStamp,
  }));
  return { count, locations, events: eventsDto };
}

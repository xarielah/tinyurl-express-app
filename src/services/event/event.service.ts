import * as eventRepository from "../../repositories/event.repository";
import { addVisitEvent } from "../../repositories/event.repository";
import * as shortenService from "../../services/shorten/shorten.service";

export async function registerVisit(
  shortId: string,
  ip?: string,
  referer?: string
) {
  let location: string | undefined = "";
  const shortenedUrl = await shortenService.getShortenLinkByShortId(shortId);
  if (!shortenedUrl) return;
  if (ip) {
    location = await fetch(`http://ip-api.com/json/${ip}`)
      .then((res) => res.json())
      .then((data) => data.country || "")
      .catch(() => "");
  }
  return addVisitEvent(shortenedUrl._id.toString(), location, ip, referer);
}

export async function getEventsByShortId(shortId: string, userId: string) {
  const shortLinkObject = await shortenService.getUserShortenLinkByShortId(
    shortId,
    userId
  );
  if (!shortLinkObject) return null;
  const sid = shortLinkObject._id.toString();
  const events = await eventRepository.getEventsByShortId(sid);
  const count = events.length;
  const locations = events.reduce((acc, event) => {
    if (event.visitorLocation) {
      if (acc[event.visitorLocation]) {
        acc[event.visitorLocation] += 1;
      } else {
        acc[event.visitorLocation] = 1;
      }
    }
    return acc;
  }, {} as Record<string, number>);
  const eventsDto = events.map((event) => ({
    location: event.visitorLocation,
    ip: event.visitorIp,
    referer: event.referer,
    timestamp: event.eventTimeStamp,
  }));
  return { count, locations, events: eventsDto };
}

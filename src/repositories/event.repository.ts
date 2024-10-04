import { eventModel } from "../database/models/event.model";

export function addVisitEvent(
  shortObjectId: string,
  location?: string,
  ip?: string,
  referer?: string
) {
  return eventModel.create({
    shortLinkId: shortObjectId,
    visitorLocation: location,
    visitorIp: ip,
    referer,
    eventTimeStamp: Date.now(),
  });
}

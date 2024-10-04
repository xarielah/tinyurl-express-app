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

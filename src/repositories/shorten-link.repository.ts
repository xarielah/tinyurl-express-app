import {
  IShortenLink,
  ShortenLink,
} from "../database/models/shorten-link.model";

export function createShortenLink(data: IShortenLink): Promise<IShortenLink> {
  return ShortenLink.create(data);
}

export function getShortenLinksByOwner(owner: string): Promise<IShortenLink[]> {
  return ShortenLink.find({ owner }).exec();
}

export function getShortenLinkByShortId(
  shortId: string
): Promise<IShortenLink | null> {
  return ShortenLink.findOne({ shortId }).exec();
}

export function deleteShortenLink(
  shortId: string
): Promise<IShortenLink | null> {
  return ShortenLink.findOneAndDelete({ shortId }).exec();
}

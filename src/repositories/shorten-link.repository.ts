import {
  ShortenLink,
  ShortenLinkDocument,
} from "../database/models/shorten-link.model";
import { ICreateShorten } from "../lib/interfaces/shorten/create-shorten.interface";

export function createShortenLink(
  data: ICreateShorten
): Promise<ShortenLinkDocument> {
  return ShortenLink.create(data);
}

export function getShortenLinksByOwner(
  owner: string
): Promise<ShortenLinkDocument[]> {
  return ShortenLink.find({ owner }).exec();
}

export function getShortenLinkByShortId(
  shortId: string
): Promise<ShortenLinkDocument | null> {
  return ShortenLink.findOne({ shortId }).exec();
}

export function deleteShortenLink(
  shortId: string
): Promise<ShortenLinkDocument | null> {
  return ShortenLink.findOneAndDelete({ shortId }).exec();
}

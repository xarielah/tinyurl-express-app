import {
  ShortenLink,
  ShortenLinkDocument,
} from "../database/models/shorten-link.model";
import { ICreateShorten } from "../lib/interfaces/shorten/create-shorten.interface";

export function createShortenLink(
  data: ICreateShorten
): Promise<ShortenLinkDocument> {
  return ShortenLink.create({
    originalUrl: data.url,
    shortId: data.shortId,
    owner: data.ownerId,
    createdAt: new Date(),
  });
}

export function getShortenLinksByOwner(
  owner: string
): Promise<ShortenLinkDocument[]> {
  return ShortenLink.find({ owner }).exec();
}

export function getUserShortenLinkById(shortId: string, userId: string) {
  return ShortenLink.findOne({ shortId, owner: userId }).exec();
}

export function getShortenLinkByShortId(
  shortId: string
): Promise<ShortenLinkDocument | null> {
  return ShortenLink.findOne({ shortId }).exec();
}

export function deleteShortenLink(
  data: IDeleteShorten
): Promise<ShortenLinkDocument | null> {
  const { shortId, owner } = data;
  return ShortenLink.findOneAndDelete({ _id: shortId, owner }).exec();
}

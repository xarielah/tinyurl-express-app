import { ShortenLinkDocument } from "../../database/models/shorten-link.model";
import { ICreateShorten } from "../../lib/interfaces/shorten/create-shorten.interface";
import { getRandomId } from "../../lib/utils";
import * as redisRepository from "../../repositories/redis.repository";
import * as shortenRepository from "../../repositories/shorten-link.repository";

export async function createShortURL(
  data: Pick<ICreateShorten, "ownerId" | "url">
): Promise<ShortenLinkDocument | null> {
  const creationPayload: ICreateShorten = { shortId: getRandomId(), ...data };
  const result = await shortenRepository.createShortenLink(creationPayload);
  if (!result) return null;
  await redisRepository.createKeyWithValue(result.shortId, result.originalUrl);
  return result;
}

export async function getAllShotenByUserId(userId: string) {
  const result = await shortenRepository.getShortenLinksByOwner(userId);
  if (result)
    return result.map((s) => ({
      id: s._id,
      url: s.originalUrl,
      shortId: s.shortId,
    }));
  return [];
}

export async function getShortenLinkByShortId(
  shortId: string
): Promise<ShortenLinkDocument | null> {
  return shortenRepository.getShortenLinkByShortId(shortId);
}

export async function getUserShortenLinkByShortId(
  shortId: string,
  userId: string
): Promise<ShortenLinkDocument | null> {
  return shortenRepository.getUserShortenLinkById(shortId, userId);
}

export async function deleteShortenLinkById(data: IDeleteShorten) {
  const result = await shortenRepository.deleteShortenLink(data);
  if (!result) return null;
  await redisRepository.removeKeyAndValue(result.shortId);
  return { id: result._id, url: result.originalUrl, shortId: result.shortId };
}

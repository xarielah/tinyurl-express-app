import { ShortenLinkDocument } from "../../database/models/shorten-link.model";
import { ICreateShorten } from "../../lib/interfaces/shorten/create-shorten.interface";
import { getRandomId } from "../../lib/utils";
import * as redisRepository from "../../repositories/redis.repository";
import * as shortenRepository from "../../repositories/shorten-link.repository";

export async function createShortURL(
  data: Pick<ICreateShorten, "ownerId" | "url">
): Promise<ShortenLinkDocument | null> {
  const result = await shortenRepository.createShortenLink({
    ...data,
    shortId: getRandomId(),
  });
  if (result) {
    const cacheResult = await redisRepository.createKeyWithValue(
      result.shortId,
      result.originalUrl
    );
    if (cacheResult) return result;
  }
  return null;
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

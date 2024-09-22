import * as redisRepository from "../../repositories/redis.repository";
import * as shortenService from "../../services/shorten/shorten.service";

export async function getRedirectUrlByKey(
  shortId: string
): Promise<string | null> {
  const cachedResult = redisRepository.getKeyWithValue(shortId);
  if (cachedResult) return cachedResult;
  const dbResult = await shortenService.getShortenLinkByShortId(shortId);
  if (!dbResult) return null;
  const { originalUrl: url } = dbResult;
  const newlyCachedResult = await cacheRedirectUrl(shortId, url);
  return newlyCachedResult;
}

export function cacheRedirectUrl(
  shortId: string,
  url: string
): Promise<string | null> {
  return redisRepository.createKeyWithValue(shortId, url);
}

import { redisClient } from "../lib/redis/connect-client";

export function getRedirectUrlByKey(key: string): Promise<string | null> {
  return redisClient.get(key) || null;
}

export async function setRedirectUrl(
  key: string,
  url: string
): Promise<boolean | null> {
  if (await getRedirectUrlByKey(key)) return null;
  return await redisClient
    .set(key, url)
    .then(() => true)
    .catch((error) => {
      console.error("Failed to set redirect URL:", error);
      return false;
    });
}

export async function deleteRedirectUrl(key: string): Promise<void> {
  await redisClient.del(key);
}

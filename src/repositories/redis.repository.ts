import { redisClient } from "../lib/redis/connect-client";

export function getKeyWithValue(key: string): Promise<string | null> {
  return redisClient.get(key);
}

export async function removeKeyAndValue(key: string): Promise<number> {
  console.log("🚀 ~ removeKeyAndValue ~ key:", key);
  return redisClient.del(key);
}

export async function createKeyWithValue(
  key: string,
  value: string
): Promise<string | null> {
  return redisClient.set(key, value);
}

import { createClient } from "redis";
import { redisConfig } from "../config/redis.config";

const client = createClient({
  url: redisConfig.uri,
});

// # Register events to be logged.
client.on("error", (error) => console.error("Redis client error:", error));
client.on("connect", () => console.log("Redis client connected"));

export async function connectRedisClient() {
  await client.connect();
}

export { client as redisClient };

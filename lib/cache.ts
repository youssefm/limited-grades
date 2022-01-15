import {
  createClient,
  RedisClientType,
  RedisModules,
  RedisScripts,
} from "redis";

export const IS_ENABLED = process.env.REDIS_URL !== undefined;

export async function connect() {
  if (!IS_ENABLED) {
    throw "Cannot connect to cache when it is not enabled";
  }

  const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  });

  redisClient.on("error", (error) => console.log("Redis Client Error:", error));

  await redisClient.connect();
  return new CacheClient(redisClient);
}

class CacheClient {
  redisClient: RedisClientType<RedisModules, RedisScripts>;

  constructor(redisClient: RedisClientType<RedisModules, RedisScripts>) {
    this.redisClient = redisClient;
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, expirationInHours: number) {
    return await this.redisClient.set(key, value, {
      EX: expirationInHours * 60 * 60,
    });
  }

  async disconnect() {
    await this.redisClient.quit();
  }
}

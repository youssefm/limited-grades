import { gzip, ungzip } from "node-gzip";
import {
  commandOptions,
  createClient,
  RedisClientType,
  RedisModules,
  RedisScripts,
} from "redis";

import { LazySingleton, readJsonFile, writeJsonFile } from "./util.server";

export interface Cache {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: any, expirationInSeconds: number) => Promise<void>;
}

type RedisClient = RedisClientType<RedisModules, RedisScripts>;

const IS_REDIS_ENABLED = process.env.USE_REDIS_CACHE === "true";
const REDIS_CLIENT = new LazySingleton(async (): Promise<RedisClient> => {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error(
      "Redis is not configured with a REDIS_URL environment variable"
    );
  }

  const client = createClient({
    url,
    socket: {
      tls: true,
      rejectUnauthorized: false,
      reconnectStrategy: (retries) => Math.min(retries * 1000, 10000),
    },
  });

  client.on("error", (error) => console.log("Redis Client Error:", error));

  await client.connect();
  return client;
});

export const REDIS_CACHE = {
  get: async <T>(key: string): Promise<T | null> => {
    const redisClient = await REDIS_CLIENT.get();
    const zippedValue = await redisClient.get(
      commandOptions({ returnBuffers: true }),
      key
    );
    if (zippedValue === null) {
      return zippedValue;
    }
    const buffer = await ungzip(zippedValue);
    return JSON.parse(buffer.toString());
  },
  set: async (key: string, value: any, expirationInSeconds: number) => {
    const zippedValue = await gzip(JSON.stringify(value));
    const redisClient = await REDIS_CLIENT.get();
    await redisClient.set(key, zippedValue, {
      EX: expirationInSeconds,
    });
  },
  clear: async () => {
    const redisClient = await REDIS_CLIENT.get();
    await redisClient.flushDb();
  },
};

const getFileCachePath = (key: string) => `./data/cache/${key}.json`;

export const FILE_CACHE = {
  get: async <T>(key: string): Promise<T | null> => {
    const filePath = getFileCachePath(key);
    try {
      return await readJsonFile<T>(filePath);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return null;
      }
      throw error;
    }
  },
  set: async (key: string, value: any) => {
    const filePath = getFileCachePath(key);
    await writeJsonFile(filePath, value);
  },
};

export const CACHE = IS_REDIS_ENABLED ? REDIS_CACHE : FILE_CACHE;

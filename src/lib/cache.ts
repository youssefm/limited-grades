import { readFile, writeFile } from "fs/promises";

import { gzip, ungzip } from "node-gzip";
import {
  createClient,
  RedisClientType,
  RedisModules,
  RedisScripts,
} from "redis";

import { LazySingleton } from "./util";

export interface Cache {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: any, expirationInSeconds: number) => Promise<void>;
}

type RedisClient = RedisClientType<RedisModules, RedisScripts>;

const IS_REDIS_ENABLED = process.env.REDIS_URL !== undefined;
const REDIS_CLIENT = new LazySingleton(async (): Promise<RedisClient> => {
  const client = createClient({
    url: process.env.REDIS_URL,
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

const REDIS_CACHE = {
  get: async <T>(key: string): Promise<T | null> => {
    const redisClient = await REDIS_CLIENT.get();
    const compressedValue = await redisClient.get(key);
    if (compressedValue === null) {
      return compressedValue;
    }
    const buffer = await ungzip(Buffer.from(compressedValue, "base64"));
    return JSON.parse(buffer.toString());
  },
  set: async (key: string, value: any, expirationInSeconds: number) => {
    const compressedValue = await gzip(JSON.stringify(value));
    const redisClient = await REDIS_CLIENT.get();
    await redisClient.set(key, compressedValue.toString("base64"), {
      EX: expirationInSeconds,
    });
  },
};

const getFileCachePath = (key: string) => `./data/cache/${key}.json`;

const FILE_CACHE = {
  get: async <T>(key: string): Promise<T | null> => {
    const filePath = getFileCachePath(key);
    try {
      return JSON.parse(await readFile(filePath, "utf8"));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return null;
      }
      throw error;
    }
  },
  set: async (key: string, value: any) => {
    const filePath = getFileCachePath(key);
    await writeFile(filePath, JSON.stringify(value), "utf8");
  },
};

export const CACHE = IS_REDIS_ENABLED ? REDIS_CACHE : FILE_CACHE;

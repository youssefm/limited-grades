import { PrismaClient } from "@prisma/client";

import { readJsonFile, writeJsonFile } from "./util.server";

export interface CacheResult<T> {
  value: T;
  isExpired: boolean;
}

export interface Cache {
  name: string;
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: any, expirationInSeconds: number) => Promise<void>;
  getLatest<T>(key: string): Promise<CacheResult<T> | null>;
}

const IS_POSTGRES_ENABLED = process.env.USE_POSTGRES_CACHE === "true";
const prisma = new PrismaClient();
export const POSTGRES_CACHE = {
  name: "postgres",
  get: async <T>(key: string): Promise<T | null> => {
    const cacheRow = await prisma.cache.findFirst({
      where: { key, expiresAt: { gte: new Date() } },
    });
    return cacheRow === null ? null : (cacheRow.value as T);
  },
  set: async (key: string, value: any, expirationInSeconds: number) => {
    const expiresAt = new Date(
      new Date().getTime() + expirationInSeconds * 1000
    );
    await prisma.cache.upsert({
      where: { key },
      update: { value, expiresAt },
      create: { key, value, expiresAt },
    });
  },
  delete: async (key: string) => {
    await prisma.cache.delete({
      where: { key },
    });
  },
  async getLatest<T>(key: string): Promise<CacheResult<T> | null> {
    const cacheRow = await prisma.cache.findFirst({
      where: { key },
      orderBy: { expiresAt: "desc" },
    });
    if (cacheRow === null) {
      return null;
    }
    return {
      value: cacheRow.value as T,
      isExpired: cacheRow.expiresAt < new Date(),
    };
  },
};

const getFileCachePath = (key: string): string => `data/${key}.json`;

export const FILE_CACHE = {
  name: "file",
  async get<T>(key: string): Promise<T | null> {
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
  async set(key: string, value: any) {
    const filePath = getFileCachePath(key);
    await writeJsonFile(filePath, value);
  },
  getLatest<T>(key: string): Promise<CacheResult<T> | null> {
    return this.get(key);
  },
};

export const CACHE = IS_POSTGRES_ENABLED ? POSTGRES_CACHE : FILE_CACHE;

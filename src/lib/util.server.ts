import { readFile, writeFile } from "fs/promises";

import { gzip, ungzip } from "node-gzip";

// Adapted from https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/createRound.js
export const round = (n: number, precision: number = 0): number => {
  let [significand, exponent] = `${n}e`.split("e");
  const value = Math.round(
    Number(`${significand}e${Number(exponent) + precision}`)
  );

  [significand, exponent] = `${value}e`.split("e");
  return Number(`${significand}e${Number(exponent) - precision}`);
};

export const readJsonFile = async <T>(filePath: string): Promise<T> => {
  let buffer = await readFile(filePath);
  if (filePath.endsWith(".gz")) {
    buffer = await ungzip(buffer);
  }
  const json = buffer.toString("utf8");
  return JSON.parse(json);
};

export const writeJsonFile = async (
  filePath: string,
  value: any
): Promise<void> => {
  const json = JSON.stringify(value);
  let buffer = Buffer.from(json, "utf8");
  if (filePath.endsWith(".gz")) {
    buffer = await gzip(buffer);
  }
  await writeFile(filePath, buffer);
};

export class LazySingleton<T> {
  #creator: () => T;

  #instance: T | null = null;

  constructor(creator: () => T) {
    this.#creator = creator;
  }

  get(): T {
    if (this.#instance === null) {
      this.#instance = this.#creator();
    }
    return this.#instance;
  }
}

export const buildUrl = (
  urlPath: string,
  queryParams: Record<string, string>
): string => `${urlPath}?${new URLSearchParams(queryParams)}`;

export const lookupEnumByValue = <T extends string>(
  Enum: Record<string, T>,
  value: string
): T | undefined => Object.values(Enum).find((v) => v === value);

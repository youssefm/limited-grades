import { readFile } from "fs/promises";

import { ungzip } from "node-gzip";

// Adapted from https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/createRound.js
export const round = (n: number, precision: number = 0) => {
  let [significand, exponent] = `${n}e`.split("e");
  const value = Math.round(
    Number(`${significand}e${Number(exponent) + precision}`)
  );

  [significand, exponent] = `${value}e`.split("e");
  return Number(`${significand}e${Number(exponent) - precision}`);
};

export const readJsonFile = async <T>(filePath: string): Promise<T> => {
  let json;
  if (filePath.endsWith(".gz")) {
    const buffer = await ungzip(await readFile(filePath));
    json = buffer.toString("utf8");
  } else {
    json = await readFile(filePath, "utf8");
  }
  return JSON.parse(json);
};

export class LazySingleton<T> {
  #creator: () => T;

  #instance: T | null = null;

  constructor(creator: () => T) {
    this.#creator = creator;
  }

  get() {
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

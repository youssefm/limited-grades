import { readFile, writeFile } from "fs/promises";

// Adapted from https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/createRound.js
export const round = (n: number, precision: number = 0): number => {
  let [significand, exponent] = `${n}e`.split("e");
  const value = Math.round(
    Number(`${significand}e${Number(exponent) + precision}`)
  );

  [significand, exponent] = `${value}e`.split("e");
  return Number(`${significand}e${Number(exponent) - precision}`);
};

export const computeWeightedAverage = (
  weightedValues: [number, number][]
): number => {
  let sum = 0;
  let totalWeight = 0;
  for (const [value, weight] of weightedValues) {
    sum += value * weight;
    totalWeight += weight;
  }
  return sum / totalWeight;
};

export const readJsonFile = async <T>(filePath: string): Promise<T> => {
  const buffer = await readFile(filePath);
  const json = buffer.toString("utf8");
  return JSON.parse(json);
};

export const writeJsonFile = async (
  filePath: string,
  value: any
): Promise<void> => {
  const json = JSON.stringify(value, null, 2);
  const buffer = Buffer.from(json, "utf8");
  await writeFile(filePath, buffer);
};

export class Lazy<T> {
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

export function* zip<T1, T2>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>
): Generator<[T1, T2]> {
  const iterator1 = iterable1[Symbol.iterator]();
  const iterator2 = iterable2[Symbol.iterator]();

  let iterator1Result;
  let iterator2Result;
  for (;;) {
    iterator1Result = iterator1.next();
    iterator2Result = iterator2.next();
    if (iterator1Result.done || iterator2Result.done) {
      break;
    }
    yield [iterator1Result.value, iterator2Result.value];
  }
}

export const indexBy = <T>(
  iterable: Iterable<T>,
  getKey: (item: T) => string
): Record<string, T> => {
  const result: Record<string, T> = {};
  for (const item of iterable) {
    const key = getKey(item);
    result[key] = item;
  }
  return result;
};

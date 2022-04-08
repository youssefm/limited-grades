export const IN_PRODUCTION = process.env.NODE_ENV === "production";

// Adapted from https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/createRound.js
export const round = (n: number, precision: number = 0) => {
  let [significand, exponent] = `${n}e`.split("e");
  const value = Math.round(
    Number(`${significand}e${Number(exponent) + precision}`)
  );

  [significand, exponent] = `${value}e`.split("e");
  return Number(`${significand}e${Number(exponent) - precision}`);
};

export const groupBy = <T>(
  iterable: Iterable<T>,
  getKey: (item: T) => string
) => {
  const result: { [key: string]: [T, ...T[]] } = {};
  for (const item of iterable) {
    const key = getKey(item);
    const group = result[key];
    if (group) {
      group.push(item);
    } else {
      result[key] = [item];
    }
  }
  return result;
};

export const createComparer = <T>(
  getKey: (item: T) => number,
  descending = false
) => {
  if (descending) {
    return (a: T, b: T) => getKey(b) - getKey(a);
  }
  return (a: T, b: T) => getKey(a) - getKey(b);
};

export const matchesMedia = (mediaQuery: string) =>
  typeof window !== "undefined" && window.matchMedia(mediaQuery).matches;

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const formatNumber = (value: number, fractionDigits: number = 0) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

export const formatPercentage = (value: number) =>
  value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

export const formatPercentageDifference = (value: number) => {
  const difference = (value * 100).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return value > 0 ? `+${difference}pp` : `${difference}pp`;
};

export const extractPathnameSegments = (url: string) =>
  new URL(url, window.location.origin).pathname.slice(1).split("/");

export const IN_PRODUCTION = process.env.NODE_ENV === "production";

export const createComparer = <T>(
  getKey: (item: T) => number,
  descending = false
): ((item1: T, item2: T) => number) => {
  if (descending) {
    return (item1, item2) => getKey(item2) - getKey(item1);
  }
  return (item1, item2) => getKey(item1) - getKey(item2);
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

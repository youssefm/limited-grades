export const groupBy = <T>(
  iterable: Iterable<T>,
  getKey: (item: T) => string
) => {
  const result: Record<string, [T, ...T[]]> = {};
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

const compare = <T>(a: T, b: T) => {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
};

const createComparer = <T>(
  getKey: (item: T) => number | string,
  descending = false
) =>
  descending
    ? (a: T, b: T) => compare(getKey(b), getKey(a))
    : (a: T, b: T) => compare(getKey(a), getKey(b));

export const sortBy = <T>(
  array: T[],
  getKey: (item: T) => number | string,
  descending = false
) => {
  array.sort(createComparer(getKey, descending));
  return array;
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

export const extractUrlQuery = (url: string) => {
  const questionMarkIndex = url.indexOf("?");
  if (questionMarkIndex === -1) {
    return "";
  }
  return url.slice(questionMarkIndex + 1);
};

export const fetchJson = async <T>(
  url: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

export const setEquals = <T>(setA: Set<T>, setB: Set<T>): boolean => {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const element of setA) {
    if (!setB.has(element)) {
      return false;
    }
  }
  return true;
};

export const reverseLookup = <K extends string, V>(
  map: Record<K, V>,
  value: V
): K | undefined => {
  const entry = Object.entries(map).find(([, v]) => v === value);
  if (entry) {
    return entry[0] as K;
  }
  return undefined;
};

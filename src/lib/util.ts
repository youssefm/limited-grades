export const groupBy = <T>(
  iterable: Iterable<T>,
  getKey: (item: T) => string
): Record<string, [T, ...T[]]> => {
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

const compare = <T>(a: T, b: T): number => {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
};

const createComparer = <T>(
  getKey: (item: T) => number | string,
  descending = false
): ((a: T, b: T) => number) =>
  descending
    ? (a: T, b: T) => compare(getKey(b), getKey(a))
    : (a: T, b: T) => compare(getKey(a), getKey(b));

export const sortBy = <T>(
  array: T[],
  getKey: (item: T) => number | string,
  descending = false
): T[] => {
  array.sort(createComparer(getKey, descending));
  return array;
};

export const matchesMedia = (mediaQuery: string): boolean =>
  typeof window !== "undefined" && window.matchMedia(mediaQuery).matches;

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const formatNumber = (
  value: number,
  fractionDigits: number = 0
): string =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

export const formatPercentage = (value: number): string =>
  value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

export const formatPercentageDifference = (value: number): string => {
  const difference = (value * 100).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return value > 0 ? `+${difference}pp` : `${difference}pp`;
};

export const extractPathnameSegments = (url: string): string[] =>
  new URL(url, window.location.origin).pathname.slice(1).split("/");

export const extractUrlQuery = (url: string): string => {
  const questionMarkIndex = url.indexOf("?");
  if (questionMarkIndex === -1) {
    return "";
  }
  return url.slice(questionMarkIndex + 1);
};

export const fetchJson = async <T>(
  url: RequestInfo | URL,
  init?: RequestInit,
  timeout?: number
): Promise<T> => {
  let response: Response;
  if (timeout === undefined) {
    response = await fetch(url, init);
  } else {
    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), timeout);
    response = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timeoutHandle);
  }

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${
        response.statusText
      } - ${await response.text()}`
    );
  }
  return response.json();
};

const JSON_MEDIA_TYPE = "application/json";

export const postJson = async <T>(
  url: string,
  data: any,
  headers?: Record<string, string>,
  timeout?: number
): Promise<T> => {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", JSON_MEDIA_TYPE);
  requestHeaders.set("Content-Type", JSON_MEDIA_TYPE);
  const init = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data),
  };
  return fetchJson(url, init, timeout);
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

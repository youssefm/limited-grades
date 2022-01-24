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

export const windowMatchesMedia = (mediaQuery: string) =>
  typeof window !== "undefined" && window.matchMedia(mediaQuery).matches;

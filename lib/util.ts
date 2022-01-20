export const IN_PRODUCTION = process.env.NODE_ENV === "production";

export const createCompareFunction = <T>(
  keyFunction: (item: T) => number,
  descending = false
): ((item1: T, item2: T) => number) => {
  if (descending) {
    return (item1, item2) => keyFunction(item2) - keyFunction(item1);
  } else {
    return (item1, item2) => keyFunction(item1) - keyFunction(item2);
  }
};

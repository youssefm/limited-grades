export interface SetIconData {
  viewBox: string;
  paths: string[];
}

let cache: Record<string, SetIconData> | null = null;
let pending: Promise<Record<string, SetIconData>> | null = null;

export const loadSetIcons = (): Promise<Record<string, SetIconData>> => {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    // Dynamic import is intentionally used for code splitting.
    // eslint-disable-next-line import/no-cycle
    pending = import("./setIconPaths").then(
      (mod) => {
        cache = mod.default;
        return cache;
      },
      (err) => {
        pending = null;
        throw err;
      }
    );
  }
  return pending;
};

export const getSetIconData = (code: string): SetIconData | undefined =>
  cache?.[code];

export const preloadSetIcons = (): void => {
  loadSetIcons().catch(() => {});
};

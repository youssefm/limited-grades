const normalizeKey = (key: string): string =>
  key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const replaceNonAscii = (key: string): string =>
  key.replace(/[^\u0020-\u007e]/g, "?");

export default class CaseInsensitiveMap<V> extends Map<string, V> {
  #fallbackMap: Map<string, V>;

  constructor(entries?: Iterable<[string, V]>) {
    super();
    this.#fallbackMap = new Map<string, V>();
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  get(key: string): V | undefined {
    const normalized = normalizeKey(key);
    return super.get(normalized) ?? this.#fallbackMap.get(normalized);
  }

  set(key: string, value: V): this {
    super.set(normalizeKey(key), value);
    // Index non-ASCII names with '?' replacing non-ASCII chars, matching
    // 17lands' encoding corruption (e.g. "Bespoke Bō" → "Bespoke B?")
    const fallbackKey = replaceNonAscii(key);
    if (fallbackKey !== key) {
      this.#fallbackMap.set(normalizeKey(fallbackKey), value);
    }
    return this;
  }

  has(key: string): boolean {
    return super.has(normalizeKey(key));
  }
}

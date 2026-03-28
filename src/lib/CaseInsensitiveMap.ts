const normalizeKey = (key: string): string =>
  key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default class CaseInsensitiveMap<V> extends Map<string, V> {
  get(key: string): V | undefined {
    return super.get(normalizeKey(key));
  }

  set(key: string, value: V): this {
    return super.set(normalizeKey(key), value);
  }

  has(key: string): boolean {
    return super.has(normalizeKey(key));
  }
}

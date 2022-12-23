export default class CaseInsensitiveMap<V> extends Map<string, V> {
  get(key: string): V | undefined {
    return super.get(key.toLowerCase());
  }

  set(key: string, value: V): this {
    return super.set(key.toLowerCase(), value);
  }

  has(key: string): boolean {
    return super.has(key.toLowerCase());
  }
}

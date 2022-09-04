export default class CaseInsensitiveMap<V> extends Map<string, V> {
  get(key: string): V | undefined {
    return super.get(key.toLowerCase());
  }

  set(key: string, value: V) {
    return super.set(key.toLowerCase(), value);
  }

  has(key: string) {
    return super.has(key.toLowerCase());
  }
}

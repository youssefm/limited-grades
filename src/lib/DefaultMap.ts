export default class DefaultMap<K, V> extends Map<K, V> {
  getDefaultValue: (key: K) => V;

  constructor(getDefaultValue: (key: K) => V) {
    super();
    this.getDefaultValue = getDefaultValue;
  }

  get(key: K): V {
    const value = super.get(key);
    if (!value) {
      const newDefaultValue = this.getDefaultValue(key);
      this.set(key, newDefaultValue);
      return newDefaultValue;
    }
    return value;
  }
}

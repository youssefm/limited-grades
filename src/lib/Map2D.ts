import DefaultMap from "./DefaultMap";

export default class Map2D<K1, K2, V> {
  #map = new DefaultMap<K1, Map<K2, V>>(() => new Map());

  get(key1: K1, key2: K2): V | undefined {
    return this.#map.get(key1).get(key2);
  }

  set(key1: K1, key2: K2, value: V): void {
    this.#map.get(key1).set(key2, value);
  }
}

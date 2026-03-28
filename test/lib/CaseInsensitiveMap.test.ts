import CaseInsensitiveMap from "lib/CaseInsensitiveMap";

describe("CaseInsensitiveMap", () => {
  it("retrieves items in a case-insensitive way", () => {
    const map = new CaseInsensitiveMap();
    map.set("KEY", 42);
    expect(map.get("key")).toEqual(42);
    expect(map.get("KEY")).toEqual(42);
    expect(map.get("kEy")).toEqual(42);
    expect(map.has("key"));
  });

  it("retrieves items ignoring diacritical marks", () => {
    const map = new CaseInsensitiveMap();
    map.set("Bespoke B\u014d", 1);
    expect(map.get("Bespoke Bo")).toEqual(1);
    expect(map.get("bespoke b\u014d")).toEqual(1);
    map.set("D\u00e9j\u00e0 Vu", 2);
    expect(map.get("Deja Vu")).toEqual(2);
  });

  it("matches ? as a wildcard for corrupted non-ASCII characters", () => {
    const map = new CaseInsensitiveMap();
    map.set("Bespoke B\u014d", 1);
    expect(map.get("Bespoke B?")).toEqual(1);
  });

  it("returns undefined for ? when no match exists", () => {
    const map = new CaseInsensitiveMap();
    map.set("Hello", 1);
    expect(map.get("Xyz?")).toBeUndefined();
  });
});

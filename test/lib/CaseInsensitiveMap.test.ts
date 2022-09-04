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
});

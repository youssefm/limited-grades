import Map2D from "lib/Map2D";

describe("Map2D", () => {
  it("roundtrips successfully", () => {
    const map = new Map2D<number, string, number>();
    map.set(45, "abc", 25);
    expect(map.get(45, "abc")).toEqual(25);
  });
});

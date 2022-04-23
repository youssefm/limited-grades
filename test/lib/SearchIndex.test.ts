import SearchIndex from "lib/SearchIndex";

describe("Search", () => {
  it("full match", () => {
    const index = new SearchIndex(["fred", "john", "sara"], (item) => item);
    const match = index.search("sara");
    expect(match).toEqual([
      {
        item: "sara",
        match: { atStartOfWord: true, startPosition: 0, endPosition: 4 },
      },
    ]);
  });

  it("partial match", () => {
    const index = new SearchIndex(["fred", "john", "sara"], (item) => item);
    const match = index.search("ara");
    expect(match).toEqual([
      {
        item: "sara",
        match: { atStartOfWord: false, startPosition: 1, endPosition: 4 },
      },
    ]);
  });

  it("no match", () => {
    const index = new SearchIndex(["fred", "john", "sara"], (item) => item);
    const match = index.search("sora");
    expect(match).toHaveLength(0);
  });
});

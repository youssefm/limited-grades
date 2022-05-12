import { extractUrlQuery } from "lib/util";

describe("extractUrlQuery", () => {
  it("extracts the  query string", () => {
    expect(extractUrlQuery("/mid?deck=wr&rarity=crm")).toEqual(
      "deck=wr&rarity=crm"
    );
  });
  it("works on empty query strings", () => {
    expect(extractUrlQuery("/mid?")).toEqual("");
  });
  it("works with no question mark", () => {
    expect(extractUrlQuery("/mid")).toEqual("");
  });
});

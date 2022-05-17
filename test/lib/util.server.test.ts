import { computeWeightedAverage, round } from "lib/util.server";

describe("round", () => {
  it("rounds to the nearest integer", () => {
    expect(round(4.6)).toEqual(5);
    expect(round(4.2)).toEqual(4);
    expect(round(4.5)).toEqual(5);
  });
});

describe("computeWeightedAverage", () => {
  it("computes a weighted average", () => {
    expect(
      computeWeightedAverage([
        [1, 4],
        [2, 1],
      ])
    ).toEqual(1.2);
  });
});

import { carryOverAlchemyEntries, ScryfallIndex } from "lib/scryfall";
import { CardType, Color } from "lib/types";

const entry = (cmc: number): ScryfallIndex[string] => ({
  color: Color.WHITE,
  cmc,
  types: [CardType.CREATURE],
});

describe("carryOverAlchemyEntries", () => {
  it("keeps Alchemy entries missing from the regenerated index", () => {
    const previousIndex: ScryfallIndex = {
      "A-Armory Veteran": entry(2),
      "Armory Veteran": entry(2),
    };
    const regeneratedIndex: ScryfallIndex = { "Armory Veteran": entry(2) };

    const { index, carriedOverCount } = carryOverAlchemyEntries(
      previousIndex,
      regeneratedIndex
    );

    expect(index).toEqual(previousIndex);
    expect(carriedOverCount).toEqual(1);
  });

  it("prefers regenerated data for Alchemy entries Scryfall still has", () => {
    const { index, carriedOverCount } = carryOverAlchemyEntries(
      { "A-Town": entry(1) },
      { "A-Town": entry(0) }
    );

    expect(index).toEqual({ "A-Town": entry(0) });
    expect(carriedOverCount).toEqual(0);
  });

  it("drops non-Alchemy entries missing from the regenerated index", () => {
    const { index, carriedOverCount } = carryOverAlchemyEntries(
      { "Everyone's an Imposter": entry(3) },
      { "Everyone's an Impostor": entry(3) }
    );

    expect(index).toEqual({ "Everyone's an Impostor": entry(3) });
    expect(carriedOverCount).toEqual(0);
  });

  it("does not modify the regenerated index", () => {
    const regeneratedIndex: ScryfallIndex = {};
    carryOverAlchemyEntries({ "A-Akki Ronin": entry(2) }, regeneratedIndex);

    expect(regeneratedIndex).toEqual({});
  });
});

import { readFile } from "fs/promises";
import { Column } from "./types";

interface ScryfallCard {
  name: string;
  card_faces?: ScryfallCardFace[];
  colors?: ScryfallColor[];
  layout: string;
  type_line: string;
}

interface ScryfallCardFace {
  name: string;
  colors?: ScryfallColor[];
}

type ScryfallColor = "W" | "U" | "B" | "R" | "G";

const COLUMNS_BY_COLOR: Record<ScryfallColor, Column> = {
  W: Column.WHITE,
  U: Column.BLUE,
  B: Column.BLACK,
  R: Column.RED,
  G: Column.GREEN,
};

let CARD_INDEX: Map<string, ScryfallCard> | undefined;

async function buildIndex() {
  if (!CARD_INDEX) {
    CARD_INDEX = new Map();
    for (const card of JSON.parse(
      await readFile("./data/oracle-cards.json", "utf8")
    ) as ScryfallCard[]) {
      if (card.layout === "art_series") {
        continue;
      }

      const names = [card.name];
      if (card.card_faces && card.card_faces.length > 0) {
        names.push(card.card_faces[0].name);
      }

      for (const name of names) {
        if (!CARD_INDEX.has(name)) {
          CARD_INDEX.set(name, card);
        }
      }
    }
  }
}

export async function getCardColumn(cardName: string): Promise<Column> {
  await buildIndex();
  const scryfallCard = CARD_INDEX!.get(cardName);
  if (!scryfallCard) {
    throw `Card named '${cardName}' could not be found in the Scryfall DB`;
  }

  const colors: ScryfallColor[] =
    scryfallCard.colors || scryfallCard.card_faces![0].colors!;

  if (colors.length == 0) {
    return Column.COLORLESS;
  }
  if (colors.length > 1) {
    return Column.MULTICOLOR;
  }
  return COLUMNS_BY_COLOR[colors[0]];
}

import { readFile } from "fs/promises";
import path from "path";

import { upperFirst } from "lodash";

import { ALL_CARD_TYPES } from "lib/constants";
import { CardType, Column } from "lib/types";

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

const buildIndex = async () => {
  if (!CARD_INDEX) {
    const scryfallFilePath = path.join(
      process.cwd(),
      "data",
      "oracle-cards.json"
    );
    console.log(`Reading Scryfall data from ${scryfallFilePath}`);

    CARD_INDEX = new Map();
    for (const card of JSON.parse(
      await readFile(scryfallFilePath, "utf8")
    ) as ScryfallCard[]) {
      if (card.layout === "art_series" || card.layout === "token") {
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
};

const lookupCard = async (cardName: string): Promise<ScryfallCard> => {
  await buildIndex();
  const scryfallCard = CARD_INDEX!.get(cardName);
  if (!scryfallCard) {
    throw Error(
      `Card named '${cardName}' could not be found in the Scryfall DB`
    );
  }
  return scryfallCard;
};

export const getCardColumn = async (cardName: string): Promise<Column> => {
  const scryfallCard = await lookupCard(cardName);
  const colors: ScryfallColor[] =
    scryfallCard.colors ?? scryfallCard.card_faces![0].colors!;

  if (colors.length === 0) {
    return Column.COLORLESS;
  }
  if (colors.length > 1) {
    return Column.MULTICOLOR;
  }
  return COLUMNS_BY_COLOR[colors[0]];
};

export const getCardTypes = async (cardName: string): Promise<CardType[]> => {
  const scryfallCard = await lookupCard(cardName);
  return ALL_CARD_TYPES.filter((cardType) =>
    scryfallCard.type_line.includes(upperFirst(cardType))
  );
};

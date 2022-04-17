import { readFile } from "fs/promises";
import path from "path";

import { ungzip } from "node-gzip";

import { ALL_CARD_TYPES } from "lib/constants";
import { CardType, Column } from "lib/types";

import { LazySingleton } from "./util";

interface ImageUris {
  border_crop: string;
}

interface ScryfallCard {
  name: string;
  card_faces?: ScryfallCardFace[];
  colors?: ScryfallColor[];
  layout: string;
  type_line?: string;
  image_uris?: ImageUris;
}

interface ScryfallCardFace {
  name: string;
  colors?: ScryfallColor[];
  type_line: string;
  image_uris: ImageUris;
}

type ScryfallColor = "W" | "U" | "B" | "R" | "G";

const COLUMNS_BY_COLOR: Record<ScryfallColor, Column> = {
  W: Column.WHITE,
  U: Column.BLUE,
  B: Column.BLACK,
  R: Column.RED,
  G: Column.GREEN,
};

const readScryfallFile = async (fileName: string): Promise<ScryfallCard[]> => {
  const scryfallFilePath = path.join(process.cwd(), "data", fileName);
  console.log(`Reading Scryfall data from ${scryfallFilePath}`);
  let json;
  if (fileName.endsWith(".gz")) {
    json = (await ungzip(await readFile(scryfallFilePath))).toString("utf-8");
  } else {
    json = await readFile(scryfallFilePath, "utf8");
  }
  return JSON.parse(json);
};

const shouldExcludeCard = (card: ScryfallCard) =>
  card.layout === "art_series" || card.layout === "token";

const CARD_INDEX = new LazySingleton(async () => {
  const index = new Map<string, ScryfallCard>();
  for (const card of await readScryfallFile("scryfall-oracle-cards.json")) {
    if (shouldExcludeCard(card)) {
      continue;
    }

    const names = [card.name];
    if (card.card_faces && card.card_faces.length > 0) {
      names.push(card.card_faces[0].name);
    }

    for (const name of names) {
      if (!index.has(name)) {
        index.set(name, card);
      }
    }
  }
  return index;
});

const lookupCard = async (cardName: string): Promise<ScryfallCard> => {
  const cardIndex = await CARD_INDEX.get();
  const scryfallCard = cardIndex.get(cardName);
  if (!scryfallCard) {
    throw Error(
      `Card named '${cardName}' could not be found in the Scryfall DB`
    );
  }
  return scryfallCard;
};

export const getCardColumn = async (cardName: string): Promise<Column> => {
  const scryfallCard = await lookupCard(cardName);
  const colors = scryfallCard.colors ?? scryfallCard.card_faces?.[0].colors;

  if (!colors || colors.length === 0) {
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
    scryfallCard.type_line?.toLowerCase().includes(cardType)
  );
};

export const getAllCardsByType = async (
  cardType: CardType
): Promise<ScryfallCard[]> =>
  (await readScryfallFile("scryfall-unique-artwork.json.gz")).filter(
    (card) =>
      !shouldExcludeCard(card) &&
      card.type_line?.toLowerCase().includes(cardType)
  );

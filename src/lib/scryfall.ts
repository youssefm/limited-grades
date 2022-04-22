import { readFile } from "fs/promises";
import path from "path";

import { ungzip } from "node-gzip";

import { ALL_CARD_TYPES } from "lib/constants";
import { CardType, Color, MagicSet } from "lib/types";

import { buildUrl, fetchJson, LazySingleton } from "./util";

type ScryfallColor = "W" | "U" | "B" | "R" | "G";

interface ImageUris {
  border_crop: string;
}
interface ScryfallCardFace {
  name: string;
  colors?: ScryfallColor[];
  type_line: string;
  image_uris: ImageUris;
}

interface ScryfallCard {
  name: string;
  card_faces?: ScryfallCardFace[];
  colors?: ScryfallColor[];
  layout: string;
  type_line?: string;
  image_uris?: ImageUris;
}

interface ScryfallCardPage {
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: ScryfallCard[];
}

const COLORS: Record<ScryfallColor, Color> = {
  W: Color.WHITE,
  U: Color.BLUE,
  B: Color.BLACK,
  R: Color.RED,
  G: Color.GREEN,
};

const shouldExcludeCard = (card: ScryfallCard) =>
  card.layout === "art_series" || card.layout === "token";

export class ScryfallIndex {
  #index: Map<string, ScryfallCard>;

  constructor(cards: ScryfallCard[]) {
    this.#index = new Map<string, ScryfallCard>();
    for (const card of cards) {
      if (shouldExcludeCard(card)) {
        continue;
      }

      const names = [card.name];
      if (card.card_faces && card.card_faces.length > 0) {
        names.push(card.card_faces[0].name);
      }

      for (const name of names) {
        if (!this.#index.has(name)) {
          this.#index.set(name, card);
        }
      }
    }
  }

  lookupCard(cardName: string): ScryfallCard {
    const scryfallCard = this.#index.get(cardName);
    if (!scryfallCard) {
      throw Error(
        `Card named '${cardName}' could not be found in the Scryfall DB`
      );
    }
    return scryfallCard;
  }

  getCardColor(cardName: string): Color {
    const scryfallCard = this.lookupCard(cardName);
    const colors = scryfallCard.colors ?? scryfallCard.card_faces?.[0].colors;

    if (!colors || colors.length === 0) {
      return Color.COLORLESS;
    }
    if (colors.length > 1) {
      return Color.MULTICOLOR;
    }
    return COLORS[colors[0]];
  }

  getCardTypes(cardName: string): CardType[] {
    const scryfallCard = this.lookupCard(cardName);
    return ALL_CARD_TYPES.filter((cardType) =>
      scryfallCard.type_line?.toLowerCase().includes(cardType)
    );
  }
}

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

export const SCRYFALL_FILE_INDEX = new LazySingleton(
  async () =>
    new ScryfallIndex(await readScryfallFile("scryfall-oracle-cards.json"))
);

export const getAllCardsByType = async (
  cardType: CardType
): Promise<ScryfallCard[]> =>
  (await readScryfallFile("scryfall-unique-artwork.json.gz")).filter(
    (card) =>
      !shouldExcludeCard(card) &&
      card.type_line?.toLowerCase().includes(cardType)
  );

const fetchCards = async (set: MagicSet): Promise<ScryfallCard[]> => {
  const cards: ScryfallCard[] = [];
  let url = buildUrl("https://api.scryfall.com/cards/search", {
    q: `e:${set} is:booster`,
  });
  for (;;) {
    console.log(`Making a Scryfall request to: ${url}`);
    const page = await fetchJson<ScryfallCardPage>(url);
    cards.push(...page.data);
    if (!page.next_page) {
      break;
    }
    url = page.next_page;
  }

  return cards;
};

export const fetchScryfallIndex = async (
  set: MagicSet
): Promise<ScryfallIndex> => new ScryfallIndex(await fetchCards(set));

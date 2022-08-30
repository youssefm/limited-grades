import os from "os";
import path from "path";

import download from "download";

import { ALL_CARD_TYPES } from "./constants";
import MagicSet from "./MagicSet";
import { CardType, Color } from "./types";
import { fetchJson } from "./util";
import {
  buildUrl,
  LazySingleton,
  readJsonFile,
  writeJsonFile,
} from "./util.server";

const INDEX_FILE_PATH = "data/scryfall-index.json";
const LAND_IMAGE_FILE_PATH = "data/land-image-file.json";

interface ScryfallBulkData {
  download_uri: string;
}

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

export interface ScryfallIndexEntry {
  color: Color;
  types: CardType[];
}

export type ScryfallIndex = Record<string, ScryfallIndexEntry>;

const COLORS: Record<ScryfallColor, Color> = {
  W: Color.WHITE,
  U: Color.BLUE,
  B: Color.BLACK,
  R: Color.RED,
  G: Color.GREEN,
};

const EXCLUDED_LAYOUTS = [
  "art_series",
  "token",
  "double_faced_token",
  "emblem",
];

const NAMED_BY_CARD_FACE_LAYOUTS = ["transform", "modal_dfc", "adventure"];

const shouldExcludeCard = (card: ScryfallCard) =>
  EXCLUDED_LAYOUTS.includes(card.layout);

const getCardName = (card: ScryfallCard) => {
  if (
    NAMED_BY_CARD_FACE_LAYOUTS.includes(card.layout) &&
    card.card_faces &&
    card.card_faces.length > 0
  ) {
    return card.card_faces[0]!.name;
  }
  return card.name;
};

const getCardColor = (card: ScryfallCard) => {
  const colors = card.colors ?? card.card_faces?.[0]?.colors;

  if (!colors || colors.length === 0) {
    return Color.COLORLESS;
  }
  if (colors.length > 1) {
    return Color.MULTICOLOR;
  }
  return COLORS[colors[0]!];
};

const getCardTypes = (card: ScryfallCard) =>
  ALL_CARD_TYPES.filter((cardType) =>
    card.type_line?.toLowerCase().includes(cardType)
  );

const readScryfallFile = async (
  scryfallFilePath: string
): Promise<ScryfallCard[]> => {
  console.log(`Reading Scryfall data from ${scryfallFilePath}`);
  return await readJsonFile<ScryfallCard[]>(scryfallFilePath);
};

const downloadBulkDataFile = async (type: string): Promise<string> => {
  const bulkData = await fetchJson<ScryfallBulkData>(
    `https://api.scryfall.com/bulk-data/${type}`
  );
  const tempFolder = os.tmpdir();
  const tempFileName = `scryfall-${type}.json`;
  await download(bulkData.download_uri, tempFolder, {
    filename: tempFileName,
  });

  return path.join(tempFolder, tempFileName);
};

export const generateIndexFile = async (): Promise<void> => {
  const scryfallFilePath = await downloadBulkDataFile("oracle-cards");
  const cards = await readScryfallFile(scryfallFilePath);
  const index: ScryfallIndex = {};
  for (const card of cards) {
    if (shouldExcludeCard(card)) {
      continue;
    }
    const name = getCardName(card);
    if (name in index) {
      continue;
    }

    index[name] = {
      color: getCardColor(card),
      types: getCardTypes(card),
    };
  }
  await writeJsonFile(INDEX_FILE_PATH, index);
};

export const SCRYFALL_FILE_INDEX = new LazySingleton(async () => {
  console.log(`Reading Scryfall index from ${INDEX_FILE_PATH}`);
  return readJsonFile<ScryfallIndex>(INDEX_FILE_PATH);
});

export const generateLandImageFile = async (): Promise<void> => {
  const scryfallFilePath = await downloadBulkDataFile("unique-artwork");
  const cards = await readScryfallFile(scryfallFilePath);
  const landImageUrls: string[] = [];
  for (const card of cards) {
    if (shouldExcludeCard(card)) {
      continue;
    }
    if (card.type_line?.toLowerCase().includes(CardType.LAND)) {
      if (card.image_uris) {
        landImageUrls.push(card.image_uris.border_crop);
      } else if (card.card_faces) {
        for (const cardFace of card.card_faces) {
          if (cardFace.type_line.toLowerCase().includes(CardType.LAND)) {
            landImageUrls.push(cardFace.image_uris.border_crop);
          }
        }
      }
    }
  }
  await writeJsonFile(LAND_IMAGE_FILE_PATH, landImageUrls);
};

export const LAND_IMAGES = new LazySingleton(async () =>
  readJsonFile<string[]>(LAND_IMAGE_FILE_PATH)
);

export const fetchCards = async (set: MagicSet): Promise<ScryfallCard[]> => {
  const cards: ScryfallCard[] = [];
  let url = buildUrl("https://api.scryfall.com/cards/search", {
    q: `e:${set.code} is:booster`,
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

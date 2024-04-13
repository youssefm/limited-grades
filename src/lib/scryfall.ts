import { CACHE } from "./cache";
import CaseInsensitiveMap from "./CaseInsensitiveMap";
import { ALL_CARD_TYPES, DAY_IN_SECONDS } from "./constants";
import MagicSet from "./MagicSet";
import { CardType, Color } from "./types";
import { fetchJson } from "./util";
import { buildUrl, Lazy } from "./util.server";

export const INDEX_CACHE_KEY = "scryfall-index";
const LAND_IMAGES_CACHE_KEY = "land-images";

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
  cmc: number;
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
  cmc: number;
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

const shouldExcludeCard = (card: ScryfallCard): boolean =>
  EXCLUDED_LAYOUTS.includes(card.layout);

const getCardName = (card: ScryfallCard): string => {
  if (
    NAMED_BY_CARD_FACE_LAYOUTS.includes(card.layout) &&
    card.card_faces &&
    card.card_faces.length > 0
  ) {
    return card.card_faces[0]!.name;
  }
  return card.name;
};

const getCardColor = (card: ScryfallCard): Color => {
  const colors = card.colors ?? card.card_faces?.[0]?.colors;

  if (!colors || colors.length === 0) {
    return Color.COLORLESS;
  }
  if (colors.length > 1) {
    return Color.MULTICOLOR;
  }
  return COLORS[colors[0]!];
};

const getCardTypes = (card: ScryfallCard): CardType[] =>
  ALL_CARD_TYPES.filter((cardType) =>
    card.type_line?.toLowerCase().includes(cardType)
  );

const fetchBulkData = async (type: string): Promise<ScryfallCard[]> => {
  const bulkData = await fetchJson<ScryfallBulkData>(
    `https://api.scryfall.com/bulk-data/${type}`
  );
  console.log(`Fetching Scryfall bulk data from ${bulkData.download_uri}`);
  return fetchJson<ScryfallCard[]>(bulkData.download_uri);
};

export const generateIndex = async (): Promise<ScryfallIndex> => {
  const cards = await fetchBulkData("oracle-cards");
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
      cmc: card.cmc,
      types: getCardTypes(card),
    };
  }
  return index;
};

export const SCRYFALL_INDEX = new Lazy(async () => {
  console.log("Reading Scryfall index from cache");
  let index = await CACHE.get<ScryfallIndex>(INDEX_CACHE_KEY);
  if (!index) {
    console.log("Scryfall index not found in cache, generating...");
    index = await generateIndex();
    console.log("Writing Scryfall index to cache");
    await CACHE.set(INDEX_CACHE_KEY, index, 7 * DAY_IN_SECONDS);
  }
  return new CaseInsensitiveMap(Object.entries(index));
});

const generateLandImages = async (): Promise<string[]> => {
  const cards = await fetchBulkData("unique-artwork");
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
  return landImageUrls;
};

export const LAND_IMAGES = new Lazy(async () => {
  let landImages = await CACHE.get<string[]>(LAND_IMAGES_CACHE_KEY);
  if (!landImages) {
    landImages = await generateLandImages();
    await CACHE.set(LAND_IMAGES_CACHE_KEY, landImages, 30 * DAY_IN_SECONDS);
  }
  return landImages;
});

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

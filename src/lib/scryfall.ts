import { Readable } from "stream";
import { ReadableStream } from "stream/web";

import StreamArray from "stream-json/streamers/StreamArray";

import { CACHE } from "./cache";
import CaseInsensitiveMap from "./CaseInsensitiveMap";
import { ALL_CARD_TYPES, DAY_IN_SECONDS } from "./constants";
import MagicSet from "./MagicSet";
import { CardType, Color } from "./types";
import { fetchJson } from "./util";
import { buildUrl, Lazy } from "./util.server";

export const INDEX_CACHE_KEY = "scryfall-index";
const LAND_IMAGES_CACHE_KEY = "land-images";

// Scryfall requires every request to identify the calling application via a
// custom User-Agent and to send an explicit Accept header.
const SCRYFALL_REQUEST_INIT: RequestInit = {
  headers: {
    "User-Agent":
      "limited-grades/1.0 (https://github.com/youssefm/limited-grades)",
    Accept: "application/json",
  },
};

interface ScryfallBulkData {
  download_uri: string;
}

type ScryfallColor = "W" | "U" | "B" | "R" | "G";

interface ImageUris {
  border_crop: string;
}
interface ScryfallCardFace {
  name: string;
  printed_name?: string;
  colors?: ScryfallColor[];
  type_line: string;
  mana_cost?: string;
  image_uris: ImageUris;
}

interface ScryfallCard {
  name: string;
  set: string;
  cmc: number;
  card_faces?: ScryfallCardFace[];
  colors?: ScryfallColor[];
  layout: string;
  type_line?: string;
  keywords: string[];
  mana_cost?: string;
  image_uris?: ImageUris;
  printed_name?: string;
}

interface ScryfallCardPage {
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: ScryfallCard[];
}

interface PersistedScryfallIndexEntry {
  color: Color;
  cmc: number;
  types: CardType[];
}

export interface ScryfallIndexEntry extends PersistedScryfallIndexEntry {
  name: string;
}

export type ScryfallIndex = Record<string, PersistedScryfallIndexEntry>;

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

// Split cards use the full name (e.g. "Fire // Ice"); all other multi-face
// layouts (transform, modal_dfc, adventure, prepare, etc.) use the front face.
const FULL_NAME_LAYOUTS = ["split"];

const shouldExcludeCard = (card: ScryfallCard): boolean =>
  EXCLUDED_LAYOUTS.includes(card.layout);

const getCardName = (card: ScryfallCard): string => {
  if (card.set === "om1" && card.printed_name) {
    return card.printed_name;
  }

  if (
    !FULL_NAME_LAYOUTS.includes(card.layout) &&
    card.card_faces &&
    card.card_faces.length > 0
  ) {
    const face = card.card_faces[0]!;
    if (card.set === "om1" && face.printed_name) {
      return face.printed_name;
    }
    return face.name;
  }
  return card.name;
};

const getCardColor = (card: ScryfallCard): Color => {
  const colors = card.colors ?? card.card_faces?.[0]?.colors;

  if (!colors || colors.length === 0) {
    if (card.keywords.includes("Devoid")) {
      const manaCost = card.mana_cost ?? card.card_faces?.[0]?.mana_cost;
      if (manaCost) {
        const manaCostColors: Color[] = [];

        for (const [symbol, color] of Object.entries(COLORS)) {
          if (manaCost.includes(symbol)) {
            manaCostColors.push(color);
          }
        }

        if (manaCostColors.length === 1) {
          return manaCostColors[0]!;
        }
        if (manaCostColors.length > 1) {
          return Color.MULTICOLOR;
        }
      }
    }
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

// The bulk data files can exceed Node's maximum string length, so they are
// parsed incrementally as a stream rather than buffered and passed through
// JSON.parse (which would require materializing the whole file as a string).
async function* streamBulkData(type: string): AsyncGenerator<ScryfallCard> {
  const bulkData = await fetchJson<ScryfallBulkData>(
    `https://api.scryfall.com/bulk-data/${type}`,
    SCRYFALL_REQUEST_INIT
  );
  console.log(`Fetching Scryfall bulk data from ${bulkData.download_uri}`);
  const response = await fetch(bulkData.download_uri, SCRYFALL_REQUEST_INIT);
  if (!response.ok || !response.body) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  const cardStream = Readable.fromWeb(
    response.body as ReadableStream<Uint8Array>
  ).pipe(StreamArray.withParser());
  for await (const { value } of cardStream) {
    yield value as ScryfallCard;
  }
}

export const generateIndex = async (): Promise<ScryfallIndex> => {
  const index: ScryfallIndex = {};
  for await (const card of streamBulkData("default-cards")) {
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
    await CACHE.set(INDEX_CACHE_KEY, index, 365 * DAY_IN_SECONDS);
  }
  return new CaseInsensitiveMap(
    Object.entries(index).map(([key, entry]) => [key, { ...entry, name: key }])
  );
});

const generateLandImages = async (): Promise<string[]> => {
  const landImageUrls: string[] = [];
  for await (const card of streamBulkData("unique-artwork")) {
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
    const page = await fetchJson<ScryfallCardPage>(url, SCRYFALL_REQUEST_INIT);
    cards.push(...page.data);
    if (!page.next_page) {
      break;
    }
    url = page.next_page;
  }

  return cards;
};

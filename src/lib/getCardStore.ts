import { CACHE, Cache } from "./cache";
import CardGrader from "./CardGrader";
import Deck from "./Deck";
import MagicSet from "./MagicSet";
import { SCRYFALL_INDEX } from "./scryfall";
import { Card, CardStore, Format, Rarity } from "./types";
import { sortBy } from "./util";
import { buildUrl, retry, round } from "./util.server";

interface ApiCard {
  name: string;
  rarity: Rarity | "basic";
  url: string;
  url_back: string;
  avg_seen: number | null;
  avg_pick: number | null;
  drawn_improvement_win_rate: number | null;
  drawn_win_rate: number | null;
  ever_drawn_game_count: number;
  ever_drawn_win_rate: number | null;
  game_count: number;
  never_drawn_win_rate: number | null;
  opening_hand_win_rate: number | null;
  win_rate: number | null;
}

// The api/card_data endpoint wraps the card array in an envelope, unlike the
// older card_ratings/data endpoint which returned a bare array.
interface ApiCardDataResponse {
  data: ApiCard[];
}

const CARD_DATA_REQUEST_INIT: RequestInit = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.17lands.com/card_data",
    "X-Requested-With": "XMLHttpRequest",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
  },
};

const fetchApiCards = async (
  set: MagicSet,
  deck: Deck,
  format: Format
): Promise<ApiCard[]> => {
  const queryParams: Record<string, string> = {
    // code17Lands, when set, is already the exact expansion string the endpoint
    // expects (e.g. "Cube - Powered"); otherwise the set code needs uppercasing
    // (e.g. "msh" -> "MSH") to match case-sensitively.
    expansion: set.code17Lands ?? set.code.toUpperCase(),
    event_type: format,
    time_period: set.timePeriod,
  };

  if (deck !== Deck.ALL) {
    // 17lands expects uppercase color codes (e.g. "WU"); deck.code is lowercase.
    queryParams.colors = deck.code.toUpperCase();
  }

  const url = buildUrl("https://www.17lands.com/api/card_data", queryParams);

  console.log(`Making API request to ${url}`);
  const response = await fetch(url, CARD_DATA_REQUEST_INIT);
  if (!response.ok) {
    throw new Error(`Request to ${url} failed`);
  }
  console.log(`API Request to ${url} succeeded`);
  const body: ApiCardDataResponse = await response.json();
  return body.data;
};

function fetchApiCardsWithRetry(
  set: MagicSet,
  deck: Deck,
  format: Format
): Promise<ApiCard[]> {
  return retry(
    () => fetchApiCards(set, deck, format),
    (n) => (n > 10 ? null : 1_000 * 4 ** n)
  );
}

function isExactMatch(previousStore: CardStore, apiCards: ApiCard[]): boolean {
  const apiGameCounts = Object.fromEntries(
    apiCards.map((card) => [card.url, card.game_count])
  );
  for (const card of previousStore.cards) {
    const apiGameCount = apiGameCounts[card.cardUrl];
    const previousGameCount = card.overallStats.gameCount;
    if (apiGameCount !== previousGameCount) {
      console.log(
        `Match failed for ${card.name}: ${apiGameCount} != ${previousGameCount}`
      );
      return false;
    }
  }
  return true;
}

const buildCardStore = async (
  set: MagicSet,
  format: Format,
  previousStore?: CardStore
): Promise<CardStore> => {
  const apiCards = await fetchApiCardsWithRetry(set, Deck.ALL, format);
  if (apiCards.length === 0) {
    return { cards: [], updatedAt: new Date() };
  }
  if (previousStore && isExactMatch(previousStore, apiCards)) {
    console.log(
      `${set.code.toUpperCase()}: All decks game count is identical to the previous store`
    );
    return {
      cards: previousStore.cards,
      updatedAt: new Date(),
    };
  }

  const cards: Card[] = [];
  const setDecks = set.decks;

  const apiCardStore: [Deck, ApiCard[]][] = [[Deck.ALL, apiCards]];
  for (const deck of setDecks) {
    const deckApiCards = await fetchApiCardsWithRetry(set, deck, format);
    apiCardStore.push([deck, deckApiCards]);
  }

  const grader = new CardGrader();
  for (const [deck, deckApiCards] of apiCardStore) {
    for (const apiCard of deckApiCards) {
      if (apiCard.ever_drawn_win_rate === null) {
        continue;
      }
      grader.add(
        apiCard.url,
        deck,
        apiCard.ever_drawn_win_rate,
        apiCard.ever_drawn_game_count
      );
    }
  }
  grader.computeGrades();

  const scryfallIndex = await SCRYFALL_INDEX.get();
  for (const apiCard of apiCards) {
    const cardStats = grader.getCardStats(apiCard.url);
    if (Object.keys(cardStats).length === 0) {
      continue;
    }
    // For some reason, Amonkhet split cards are mistakently referenced by 17lands with three slashes
    const cardName = apiCard.name.replace("///", "//");
    const scryfallIndexEntry = scryfallIndex.get(cardName);
    if (!scryfallIndexEntry) {
      console.warn(
        `Card named '${cardName}' could not be found in the Scryfall DB`
      );
      continue;
    }

    cards.push({
      name: scryfallIndexEntry.name,
      color: scryfallIndexEntry.color,
      rarity: apiCard.rarity === "basic" ? Rarity.COMMON : apiCard.rarity,
      cardTypes: scryfallIndexEntry.types,
      manaValue: scryfallIndexEntry.cmc,
      cardUrl: apiCard.url,
      cardBackUrl: apiCard.url_back,
      overallStats: {
        gameCount: apiCard.game_count,
        lastSeenAt:
          apiCard.avg_seen === null ? null : round(apiCard.avg_seen, 2),
        takenAt: apiCard.avg_pick === null ? null : round(apiCard.avg_pick, 2),
        playedWinrate:
          apiCard.win_rate === null ? null : round(apiCard.win_rate, 4),
        openingHandWinrate:
          apiCard.opening_hand_win_rate === null
            ? null
            : round(apiCard.opening_hand_win_rate, 4),
        drawnWinrate:
          apiCard.drawn_win_rate === null
            ? null
            : round(apiCard.drawn_win_rate, 4),
        notDrawnWinrate:
          apiCard.never_drawn_win_rate === null
            ? null
            : round(apiCard.never_drawn_win_rate, 4),
      },
      stats: Object.fromEntries(
        Object.entries(cardStats).map(
          ([deckCode, { winrate, gameCount, grade, score }]) => [
            deckCode,
            {
              winrate: round(winrate, 4),
              gameCount,
              grade,
              score: round(score, 2),
            },
          ]
        )
      ),
    });
  }

  return {
    updatedAt: new Date(),
    cards: sortBy(cards, (card) => card.name),
  };
};

const computeCacheExpirationInSeconds = (set: MagicSet): number => {
  if (set.isRecent()) {
    // If the set is recently released (<30 days ago), expire cache entry after an hour
    return 60 * 60;
  }
  return 7 * 24 * 60 * 60;
};

const getCardStore = async (
  set: MagicSet,
  cache: Cache = CACHE
): Promise<CardStore> => {
  const { format } = set;
  const cacheKey =
    format === Format.PREMIER_DRAFT ? set.code : `${set.code}_${format}`;
  console.log(`Fetching card store for ${cacheKey} from ${cache.name} cache`);
  const cacheHit = await cache.getLatest<CardStore>(cacheKey);
  if (cacheHit && !cacheHit.isExpired) {
    console.log(`Cache hit for ${cacheKey}`);
    return {
      ...cacheHit.value,
      updatedAt: new Date(cacheHit.value.updatedAt),
    };
  }
  console.log(
    `Cache miss for ${cacheKey}: Attempting to generate the card store`
  );

  const cardStore = await buildCardStore(set, format, cacheHit?.value);
  if (cardStore.cards.length > 0) {
    const expirationInSeconds = computeCacheExpirationInSeconds(set);
    console.log(`Storing card store for ${cacheKey}`);
    await cache.set(cacheKey, cardStore, expirationInSeconds);
  }
  return cardStore;
};

export default getCardStore;

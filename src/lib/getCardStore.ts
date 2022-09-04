import assert from "assert";

import { CACHE, Cache } from "./cache";
import CardGrader from "./CardGrader";
import Deck from "./Deck";
import MagicSet from "./MagicSet";
import { SCRYFALL_FILE_INDEX } from "./scryfall";
import { Card, CardStore, Rarity } from "./types";
import { sortBy } from "./util";
import { buildUrl, round } from "./util.server";

interface ApiCard {
  name: string;
  rarity: Rarity | "basic";
  url: string;
  url_back: string;
  avg_seen: number;
  avg_pick: number;
  drawn_improvement_win_rate: number;
  drawn_win_rate: number;
  ever_drawn_game_count: number;
  ever_drawn_win_rate: number;
  game_count: number;
  never_drawn_win_rate: number;
  opening_hand_win_rate: number;
  win_rate: number;
}

const fetchApiCards = async (set: MagicSet, deck: Deck): Promise<ApiCard[]> => {
  const queryParams: Record<string, string> = {
    expansion: set.code,
    format: "PremierDraft",
    start_date: set.startDate,
    end_date: new Date().toISOString().slice(0, 10),
  };

  if (deck !== Deck.ALL) {
    queryParams.colors = deck.code;
  }

  const url = buildUrl(
    "https://www.17lands.com/card_ratings/data",
    queryParams
  );

  console.log(`Making API request to ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("request failed");
  }
  console.log("request succeeded");
  return response.json();
};

const buildCardStore = async (set: MagicSet): Promise<CardStore> => {
  const cards: Card[] = [];
  const setDecks = set.decks;
  const [apiCardStore, scryfallIndex] = await Promise.all([
    Promise.all(
      setDecks.map(async (deck): Promise<[Deck, ApiCard[]]> => {
        const apiCards = await fetchApiCards(set, deck);
        return [deck, apiCards];
      })
    ),
    SCRYFALL_FILE_INDEX.get(),
  ]);

  const grader = new CardGrader();
  for (const [deck, apiCards] of apiCardStore) {
    for (const apiCard of apiCards) {
      grader.add(
        apiCard.url,
        deck,
        apiCard.ever_drawn_win_rate,
        apiCard.ever_drawn_game_count
      );
    }
  }

  grader.computeGrades();

  const [deck, apiCards] = apiCardStore[0]!;
  assert(deck === Deck.ALL);

  for (const apiCard of apiCards) {
    const cardStats = grader.getCardStats(apiCard.url);
    if (Object.keys(cardStats).length === 0) {
      continue;
    }
    // For some reason, Amonkhet split cards are mistakently referenced by 17lands with three slashes
    const cardName = apiCard.name.replace("///", "//");
    const scryfallIndexEntry = scryfallIndex.get(cardName);
    if (!scryfallIndexEntry) {
      throw Error(
        `Card named '${cardName}' could not be found in the Scryfall DB`
      );
    }

    cards.push({
      name: cardName,
      color: scryfallIndexEntry.color,
      rarity: apiCard.rarity === "basic" ? Rarity.COMMON : apiCard.rarity,
      cardTypes: scryfallIndexEntry.types,
      cardUrl: apiCard.url,
      cardBackUrl: apiCard.url_back,
      overallStats: {
        gameCount: apiCard.game_count,
        lastSeenAt: round(apiCard.avg_seen, 2),
        takenAt: round(apiCard.avg_pick, 2),
        playedWinrate: round(apiCard.win_rate, 4),
        openingHandWinrate: round(apiCard.opening_hand_win_rate, 4),
        drawnWinrate: round(apiCard.drawn_win_rate, 4),
        notDrawnWinrate: round(apiCard.never_drawn_win_rate, 4),
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
    // If the set is recently released (< 30 days ago), expire cache entry until the next day
    // 1AM UTC is when 17Lands refreshes their daily data
    const now = new Date();
    const currentDate = now.getUTCDate();
    const nextRefreshAt = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCHours() < 1 ? currentDate : currentDate + 1,
        1
      )
    );
    return Math.ceil((nextRefreshAt.getTime() - now.getTime()) / 1000);
  }
  return 7 * 24 * 60 * 60;
};

const getCardStore = async (
  set: MagicSet,
  cache: Cache = CACHE
): Promise<CardStore> => {
  console.log(`attempting to fetch 17lands data for ${set.code} from cache`);
  const cacheHit = await cache.get<CardStore>(set.code);
  if (cacheHit) {
    console.log("cache hit");
    return {
      ...cacheHit,
      updatedAt: new Date(cacheHit.updatedAt),
    };
  }
  console.log("cache miss");

  const cardStore = await buildCardStore(set);
  const expirationInSeconds = computeCacheExpirationInSeconds(set);
  await cache.set(set.code, cardStore, expirationInSeconds);
  return cardStore;
};

export default getCardStore;

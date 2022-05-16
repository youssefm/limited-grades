import assert from "assert";

import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";

import { CACHE, Cache } from "./cache";
import Deck from "./Deck";
import MagicSet from "./MagicSet";
import { SCRYFALL_FILE_INDEX } from "./scryfall";
import { Card, CardStore, Grade, Rarity } from "./types";
import { sortBy } from "./util";
import { buildUrl, round } from "./util.server";

const MIN_GAMES_DRAWN_FOR_INFERENCE = 100;
const MIN_GAMES_DRAWN = 400;

const GRADE_THRESHOLDS: [Grade, number][] = [
  [Grade.A_PLUS, 99],
  [Grade.A, 95],
  [Grade.A_MINUS, 90],
  [Grade.B_PLUS, 85],
  [Grade.B, 76],
  [Grade.B_MINUS, 68],
  [Grade.C_PLUS, 57],
  [Grade.C, 45],
  [Grade.C_MINUS, 36],
  [Grade.D_PLUS, 27],
  [Grade.D, 17],
  [Grade.D_MINUS, 5],
  [Grade.F, 0],
];

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
  const cards: Record<string, Card> = {};
  const [apiCardStore, scryfallIndex] = await Promise.all([
    Promise.all(set.decks.map((deck) => fetchApiCards(set, deck))),
    SCRYFALL_FILE_INDEX.get(),
  ]);
  for (const [index, deck] of set.decks.entries()) {
    let apiCards: ApiCard[] = apiCardStore[index]!;
    apiCards = apiCards.filter(
      (card) =>
        card.ever_drawn_game_count >= MIN_GAMES_DRAWN_FOR_INFERENCE &&
        card.ever_drawn_win_rate
    );

    if (apiCards.length <= 1) {
      continue;
    }

    const winrates = apiCards.map((card) => card.ever_drawn_win_rate);
    const normalDistribution = new NormalDistribution(
      mean(winrates),
      std(winrates)
    );

    apiCards = apiCards.filter(
      (card) => card.ever_drawn_game_count >= MIN_GAMES_DRAWN
    );

    for (const apiCard of apiCards) {
      const cardUrl = apiCard.url;
      let card = cards[cardUrl];
      if (!card) {
        assert(deck === Deck.ALL);
        // For some reason, Amonkhet split cards are mistakently referenced by 17lands with three slashes
        const cardName = apiCard.name.replace("///", "//");
        const scryfallIndexEntry = scryfallIndex[cardName];
        if (!scryfallIndexEntry) {
          throw Error(
            `Card named '${cardName}' could not be found in the Scryfall DB`
          );
        }
        card = {
          name: cardName,
          color: scryfallIndexEntry.color,
          rarity: apiCard.rarity === "basic" ? Rarity.COMMON : apiCard.rarity,
          cardTypes: scryfallIndexEntry.types,
          cardUrl: apiCard.url,
          cardBackUrl: apiCard.url_back,
          overallStats: {
            drawnCount: apiCard.ever_drawn_game_count,
            lastSeenAt: round(apiCard.avg_seen, 2),
            takenAt: round(apiCard.avg_pick, 2),
            playedWinrate: round(apiCard.win_rate, 4),
            openingHandWinrate: round(apiCard.opening_hand_win_rate, 4),
            drawnWinrate: round(apiCard.drawn_win_rate, 4),
            notDrawnWinrate: round(apiCard.never_drawn_win_rate, 4),
          },
          stats: {},
        };
        cards[cardUrl] = card;
      }

      const score = normalDistribution.cdf(apiCard.ever_drawn_win_rate) * 100;
      const [grade] = GRADE_THRESHOLDS.find(
        ([, threshold]) => score >= threshold
      )!;

      card.stats[deck.code] = {
        winrate: round(apiCard.ever_drawn_win_rate, 4),
        gameCount: apiCard.game_count,
        grade,
      };
    }
  }

  return {
    updatedAt: new Date(),
    cards: sortBy(Object.values(cards), (card) => card.name),
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

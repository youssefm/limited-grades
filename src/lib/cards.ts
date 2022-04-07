import assert from "assert";

import { Temporal } from "@js-temporal/polyfill";
import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";

import { CACHE } from "lib/cache";
import { ALL_DECKS, SET_START_DATES } from "lib/constants";
import { getCardColumn, getCardTypes } from "lib/scryfall";
import { isRecentSet } from "lib/sets";
import { Card, CardStore, Deck, Grade, MagicSet, Rarity } from "lib/types";
import { round, sleep } from "lib/util";

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
  const urlParams: Record<string, string> = {
    expansion: set,
    format: "PremierDraft",
    start_date: SET_START_DATES[set].toString(),
    end_date: Temporal.Now.plainDateISO("UTC").toString(),
  };

  if (deck !== Deck.ALL) {
    urlParams.colors = deck;
  }

  const queryString = new URLSearchParams(urlParams).toString();
  const url = `https://www.17lands.com/card_ratings/data?${queryString}`;

  console.log(`Making API request to ${url}`);
  let response = await fetch(url);
  while (!response.ok) {
    console.log("request failed, retrying in 10 seconds");
    await sleep(10000);
    response = await fetch(url);
  }
  console.log("request succeeded");

  return response.json();
};

const buildCardStore = async (set: MagicSet): Promise<CardStore> => {
  const cards: { [key: string]: Card } = {};
  const apiCardStore = await Promise.all(
    ALL_DECKS.map((deck) => fetchApiCards(set, deck))
  );
  for (const [index, deck] of ALL_DECKS.entries()) {
    let apiCards: ApiCard[] = apiCardStore[index];
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
        card = {
          name: cardName,
          column: await getCardColumn(cardName),
          rarity: apiCard.rarity === "basic" ? Rarity.COMMON : apiCard.rarity,
          cardTypes: await getCardTypes(cardName),
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

      card.stats[deck] = {
        winrate: round(apiCard.ever_drawn_win_rate, 4),
        gameCount: apiCard.game_count,
        grade,
      };
    }
  }

  return { updatedAt: Temporal.Now.instant(), cards: Object.values(cards) };
};

// eslint-disable-next-line import/prefer-default-export
export const getCardStore = async (set: MagicSet): Promise<CardStore> => {
  console.log(`attempting to fetch 17lands data for ${set} from cache`);
  const cacheHit = await CACHE.get<CardStore>(set);
  if (cacheHit) {
    console.log("cache hit");
    return {
      ...cacheHit,
      updatedAt: Temporal.Instant.from(cacheHit.updatedAt),
    };
  }
  console.log("cache miss");

  const cardStore = await buildCardStore(set);
  let expirationInSeconds;
  if (isRecentSet(set)) {
    // If the set is recently released (< 30 days ago), expire cache entry until the next day
    // 1AM UTC is when 17Lands refreshes their daily data
    const now = Temporal.Now.zonedDateTimeISO("UTC");
    const nextRefreshAt = Temporal.ZonedDateTime.from({
      timeZone: "UTC",
      year: now.year,
      month: now.month,
      day: now.hour < 1 ? now.day : now.day + 1,
      hour: 1,
    });
    expirationInSeconds = Math.floor(
      Temporal.Now.zonedDateTimeISO().until(nextRefreshAt).total("second")
    );
  } else {
    expirationInSeconds = 7 * 24 * 60 * 60;
  }
  await CACHE.set(set, cardStore, expirationInSeconds);
  return cardStore;
};

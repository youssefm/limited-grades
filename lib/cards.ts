import { readFile, writeFile } from "fs/promises";
import { find } from "lodash";
import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";

import { LATEST_SET } from "./constants";
import { Card, Deck, MagicSet, Grade, Rarity } from "./types";
import { getCardColumn, getCardTypes } from "./scryfall";
import { inProd } from "./util";

interface ApiCard {
  name: string;
  drawn_improvement_win_rate: number;
  ever_drawn_game_count: number;
  ever_drawn_win_rate: number;
  game_count: number;
  rarity: Rarity | "basic";
  url: string;
  url_back: string;
}

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

const SET_START_DATES: Partial<Record<MagicSet, string>> = {
  [MagicSet.CRIMSON_VOW]: "2021-11-11",
  [MagicSet.MIDNIGHT_HUNT]: "2021-09-16",
  [MagicSet.FORGOTTEN_REALM]: "2021-07-08",
  [MagicSet.STRIXHAVEN]: "2021-04-15",
  [MagicSet.KALDHEIM]: "2021-01-28",
  [MagicSet.ZENDIKAR]: "2020-09-17",
  [MagicSet.IKORIA]: "2020-04-16",
  [MagicSet.AMONKHET]: "2020-08-13",
  [MagicSet.KALADESH]: "2020-11-12",
  [MagicSet.ARENA_CUBE]: "2022-01-06",
};

export async function getCards(set: MagicSet): Promise<Card[]> {
  const cards: { [key: string]: Card } = {};

  for (const deck of Object.values(Deck)) {
    let apiCards: ApiCard[] = await getApiCards(set, deck);
    apiCards = apiCards.filter(
      (card) => card.ever_drawn_game_count >= 200 && card.ever_drawn_win_rate
    );

    if (apiCards.length <= 1) {
      continue;
    }

    const winrates = apiCards.map((card) => card.ever_drawn_win_rate);
    const normalDistribution = new NormalDistribution(
      mean(winrates),
      std(winrates)
    );

    for (const apiCard of apiCards) {
      const cardUrl = apiCard.url;
      let card = cards[cardUrl];
      if (!card) {
        // For some reason, Amonkhet split cards are mistakently referenced by 17lands with three slashes
        const cardName = apiCard.name.replace("///", "//");
        card = {
          name: cardName,
          column: await getCardColumn(cardName),
          rarity: apiCard.rarity === "basic" ? Rarity.COMMON : apiCard.rarity,
          cardTypes: await getCardTypes(cardName),
          cardUrl: apiCard.url,
          cardBackUrl: apiCard.url_back,
          stats: {},
        };
        cards[cardUrl] = card;
      }

      const score = normalDistribution.cdf(apiCard.ever_drawn_win_rate) * 100;
      const grade: Grade = find<[Grade, number]>(
        GRADE_THRESHOLDS,
        ([grade, threshold]) => score >= threshold
      )![0];

      card.stats[deck] = {
        winrate: apiCard.ever_drawn_win_rate,
        improvementWhenDrawn: apiCard.drawn_improvement_win_rate,
        gameCount: apiCard.game_count,
        score: score,
        grade: grade,
      };
    }
  }

  return Object.values(cards);
}

async function getApiCards(set: MagicSet, deck: Deck): Promise<ApiCard[]> {
  if (inProd() && (set === LATEST_SET || set === MagicSet.ARENA_CUBE)) {
    return await fetchApiCards(set, deck);
  }

  const filePath = `./data/17lands/${set}-${deck}.json`;
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error: any) {
    if (error.code === "ENOENT") {
      const cards = await fetchApiCards(set, deck);
      await writeFile(filePath, JSON.stringify(cards), "utf8");
      return cards;
    }
    throw error;
  }
}

async function fetchApiCards(set: MagicSet, deck: Deck): Promise<ApiCard[]> {
  const urlParams: Record<string, string> = {
    expansion: set,
    format: "PremierDraft",
    start_date: SET_START_DATES[set] || "2020-04-16",
    end_date: new Date().toISOString().substring(0, 10),
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
    await new Promise((resolve) => setTimeout(resolve, 10000));
    response = await fetch(url);
  }
  console.log("request succeeded");

  return await response.json();
}

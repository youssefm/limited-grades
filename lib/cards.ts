import { find } from "lodash";
import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";

import { GRADE_THRESHOLDS, LATEST_SET } from "./constants";
import { ApiCard, Card, Deck, Set, Grade, Rarity } from "./types";
import { getCardColumn } from "./scryfall";
import { inProd } from "./util";
import { readFile, writeFile } from "fs/promises";

export async function getCards(set: Set): Promise<Card[]> {
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

async function getApiCards(set: Set, deck: Deck): Promise<ApiCard[]> {
  if (inProd() && set === LATEST_SET) {
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

async function fetchApiCards(set: Set, deck: Deck): Promise<ApiCard[]> {
  const endDate = new Date().toISOString().substring(0, 10);
  let url = `https://www.17lands.com/card_ratings/data?expansion=${set}&format=PremierDraft&start_date=2020-04-16&end_date=${endDate}`;
  if (deck !== Deck.ALL) {
    url = url.concat(`&colors=${deck}`);
  }

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

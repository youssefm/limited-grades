import { ApiCard, Card, Column, Deck, Set, Grade } from "./types";
import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";
import { find } from "lodash";
import { COLUMNS_BY_COLOR, GRADE_THRESHOLDS } from "./constants";

export async function getCards(set: Set): Promise<Card[]> {
  const cards: { [key: string]: Card } = {};

  for (const deck of Object.values(Deck)) {
    let apiCards: ApiCard[] = await fetchCards(set, deck);
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
        let column: Column = COLUMNS_BY_COLOR[apiCard.color];
        if (!column) {
          column =
            apiCard.color.length == 0 ? Column.COLORLESS : Column.MULTICOLOR;
        }
        card = {
          name: apiCard.name,
          column: column,
          rarity: apiCard.rarity,
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

async function fetchCards(set: Set, deck: Deck): Promise<ApiCard[]> {
  const endDate = new Date().toISOString().substring(0, 10);
  let url = `https://www.17lands.com/card_ratings/data?expansion=${set}&format=PremierDraft&start_date=2020-04-16&end_date=${endDate}`;
  if (deck !== Deck.ALL) {
    url = url.concat(`&colors=${deck}`);
  }

  if (process.env.NODE_ENV === "production") {
    console.log("in prod: waiting 5-10 seconds before making the request");
    await new Promise((resolve) =>
      setTimeout(resolve, 5000 + Math.random() * 5000)
    );
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

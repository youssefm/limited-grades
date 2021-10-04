import { ApiCard, Card, Column, Deck, Expansion, Tier } from "./types";
import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";
import { find } from "lodash";
import { COLUMNS_BY_COLOR, TIER_THRESHOLDS } from "./constants";

export async function getCards(
  expansion: Expansion,
  deck: Deck
): Promise<Card[]> {
  const endDate = new Date().toISOString().substring(0, 10);
  let url = `https://www.17lands.com/card_ratings/data?expansion=${expansion}&format=PremierDraft&start_date=2021-01-01&end_date=${endDate}`;
  if (deck !== Deck.ALL) {
    url = url.concat(`&colors=${deck}`);
  }

  console.log(`Making API request to ${url}`);
  let response = await fetch(url);
  while (!response.ok) {
    console.log("request failed");
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 30000));
    response = await fetch(url);
  }
  console.log("request succeeded");

  let cards: ApiCard[] = await response.json();
  cards = cards.filter((card) => card.game_count >= 400);

  if (cards.length === 0) {
    return [];
  }

  const winrates = cards.map((card) => card.ever_drawn_win_rate);
  const normalDistribution = new NormalDistribution(
    mean(winrates),
    std(winrates)
  );

  return cards.map((apiCard) => {
    let column: Column = COLUMNS_BY_COLOR[apiCard.color];
    if (!column) {
      column = apiCard.color.length == 0 ? Column.COLORLESS : Column.MULTICOLOR;
    }

    const grade = normalDistribution.cdf(apiCard.ever_drawn_win_rate) * 100;
    const tier: Tier = find<[Tier, number]>(
      TIER_THRESHOLDS,
      ([tier, threshold]) => grade >= threshold
    )![0];

    return {
      name: apiCard.name,
      column: column,
      grade: grade,
      tier: tier,
      rarity: apiCard.rarity,
      cardUrl: apiCard.url,
      cardBackUrl: apiCard.url_back,
    };
  });
}

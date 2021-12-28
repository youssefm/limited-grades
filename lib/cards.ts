import { ApiCard, Card, Column, Deck, Set, Tier } from "./types";
import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";
import { find } from "lodash";
import { COLUMNS_BY_COLOR, TIER_THRESHOLDS } from "./constants";

export async function getCards(set: Set, deck: Deck): Promise<Card[]> {
  let cards: ApiCard[] = await fetchCards(set, deck);
  cards = cards.filter(
    (card) => card.ever_drawn_game_count >= 200 && card.ever_drawn_win_rate
  );

  if (cards.length <= 1) {
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

async function fetchCards(set: Set, deck: Deck): Promise<ApiCard[]> {
  const endDate = new Date().toISOString().substring(0, 10);
  let url = `https://www.17lands.com/card_ratings/data?expansion=${set}&format=PremierDraft&start_date=2020-04-16&end_date=${endDate}`;
  if (deck !== Deck.ALL) {
    url = url.concat(`&colors=${deck}`);
  }

  console.log(`Making API request to ${url}`);
  let response = await fetch(url);
  while (!response.ok) {
    console.log("request failed, retrying in a little bit");
    await new Promise((resolve) => setTimeout(resolve, 20000));
    response = await fetch(url);
  }
  console.log("request succeeded");

  return await response.json();
}

import Deck from "./Deck";
import { Card, Color, Grade } from "./types";
import { groupBy, sortBy } from "./util";

export default class CardTableDictionary {
  #cardsByGroup: Record<string, [Card, ...Card[]]>;

  constructor(cards: Card[], deck: Deck) {
    const filteredCards = cards.filter((card) => deck.code in card.stats);
    this.#cardsByGroup = groupBy(
      filteredCards,
      (card) => `${card.color},${card.stats[deck.code]!.grade}`
    );

    for (const group of Object.values(this.#cardsByGroup)) {
      sortBy(group, (card) => card.stats[deck.code]!.score, true);
    }
  }

  get(color: Color, grade: Grade): Card[] {
    return this.#cardsByGroup[`${color},${grade}`] ?? [];
  }
}

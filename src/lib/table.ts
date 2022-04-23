import { Card, Color, Grade } from "lib/types";
import { groupBy, sortBy } from "lib/util";

import Deck from "./Deck";

// eslint-disable-next-line import/prefer-default-export
export class CardTableDictionary {
  #cardsByGroup: Record<string, [Card, ...Card[]]>;

  constructor(cards: Card[], deck: Deck) {
    const filteredCards = cards.filter((card) => deck.code in card.stats);
    this.#cardsByGroup = groupBy(
      filteredCards,
      (card) => `${card.color},${card.stats[deck.code]!.grade}`
    );

    for (const group of Object.values(this.#cardsByGroup)) {
      sortBy(group, (card) => card.stats[deck.code]!.winrate, true);
    }
  }

  get(color: Color, grade: Grade): Card[] {
    return this.#cardsByGroup[`${color},${grade}`] ?? [];
  }
}

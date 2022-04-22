import { Card, Color, Deck, Grade } from "lib/types";
import { groupBy, sortBy } from "lib/util";

// eslint-disable-next-line import/prefer-default-export
export class CardTableDictionary {
  #cardsByGroup: { [index: string]: [Card, ...Card[]] };

  constructor(cards: Card[], deck: Deck) {
    const filteredCards = cards.filter((card) => deck in card.stats);
    this.#cardsByGroup = groupBy(
      filteredCards,
      (card) => `${card.color},${card.stats[deck]!.grade}`
    );

    for (const group of Object.values(this.#cardsByGroup)) {
      sortBy(group, (card) => card.stats[deck]!.winrate, true);
    }
  }

  get(color: Color, grade: Grade): Card[] {
    return this.#cardsByGroup[`${color},${grade}`] ?? [];
  }
}

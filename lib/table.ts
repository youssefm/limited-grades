import { Dictionary, groupBy } from "lodash";

import { Card, Column, Deck, Grade } from "lib/types";
import { createCompareFunction } from "lib/util";

export class CardTableDictionary {
  cardsByGroup: Dictionary<[Card, ...Card[]]>;

  constructor(cards: Card[], deck: Deck) {
    const filteredCards = cards.filter((card) => deck in card.stats);
    this.cardsByGroup = groupBy(
      filteredCards,
      (card) => `${card.column},${card.stats[deck]!.grade}`
    );

    for (const group of Object.values(this.cardsByGroup)) {
      group.sort(
        createCompareFunction((card) => card.stats[deck]!.winrate, true)
      );
    }
  }

  get(column: Column, grade: Grade): Card[] {
    return this.cardsByGroup[`${column},${grade}`] || [];
  }

  getAll(): Card[] {
    return Object.values(this.cardsByGroup).flat();
  }
}

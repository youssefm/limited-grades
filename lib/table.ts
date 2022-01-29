import { Dictionary, groupBy } from "lodash";

import { Card, Column, Grade } from "lib/types";
import { createCompareFunction } from "lib/util";

export class CardTableDictionary {
  cardsByGroup: Dictionary<[Card, ...Card[]]>;

  constructor(cards: Card[]) {
    const filteredCards = cards.filter((card) => card.gameCount > 0);
    this.cardsByGroup = groupBy(
      filteredCards,
      (card) => `${card.column},${card.grade}`
    );

    for (const group of Object.values(this.cardsByGroup)) {
      group.sort(
        createCompareFunction((card) => card.winrate, true)
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

import { mean, std } from "mathjs";
import NormalDistribution from "normal-distribution";

import Deck from "./Deck";
import DefaultMap from "./DefaultMap";
import { CardStats, Grade } from "./types";

const MIN_GAMES_DRAWN_FOR_INFERENCE = 100;
const MIN_GAMES_DRAWN = 400;

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

interface CardRecord {
  cardKey: string;
  deck: Deck;
  winrate: number;
  gameCount: number;
}

export default class CardGrader {
  #cardRecordsByDeck = new DefaultMap<Deck, CardRecord[]>(() => []);

  #cardStats = new DefaultMap<string, Record<string, CardStats>>(() => ({}));

  add(cardKey: string, deck: Deck, winrate: number, gameCount: number): void {
    if (!winrate) {
      return;
    }
    const cardRecord = { cardKey, deck, winrate, gameCount };
    this.#cardRecordsByDeck.get(deck).push(cardRecord);
  }

  computeGrades(): void {
    for (const [deck, cardRecords] of this.#cardRecordsByDeck.entries()) {
      const filteredCardRecords = cardRecords.filter(
        ({ gameCount }) => gameCount >= MIN_GAMES_DRAWN_FOR_INFERENCE
      );
      if (filteredCardRecords.length <= 1) {
        continue;
      }

      const winrates = filteredCardRecords.map(
        (cardRecord) => cardRecord.winrate
      );
      const normalDistribution = new NormalDistribution(
        mean(winrates),
        std(winrates)
      );

      for (const { cardKey, winrate, gameCount } of filteredCardRecords) {
        if (gameCount <= MIN_GAMES_DRAWN) {
          continue;
        }
        const score = normalDistribution.cdf(winrate) * 100;
        const grade = GRADE_THRESHOLDS.find(
          ([, threshold]) => score >= threshold
        )![0];
        this.#cardStats.get(cardKey)[deck.code] = {
          winrate,
          gameCount,
          score,
          grade,
        };
      }
    }
  }

  getCardStats(cardKey: string): Record<string, CardStats> {
    return this.#cardStats.get(cardKey);
  }
}

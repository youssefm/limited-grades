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
  [Grade.B_PLUS, 82],
  [Grade.B, 74],
  [Grade.B_MINUS, 65.5],
  [Grade.C_PLUS, 56.5],
  [Grade.C, 45.5],
  [Grade.C_MINUS, 35],
  [Grade.D_PLUS, 26],
  [Grade.D, 15],
  [Grade.D_MINUS, 5],
  [Grade.F, 0],
];

interface CardRecord {
  cardKey: string;
  deck: Deck;
  winrate: number;
  gameCount: number;
}

const computeGrade = (
  normalDistribution: NormalDistribution,
  winrate: number
): [number, Grade] => {
  const score = normalDistribution.cdf(winrate) * 100;
  const grade = GRADE_THRESHOLDS.find(
    ([, threshold]) => score >= threshold
  )![0];
  return [score, grade];
};

export default class CardGrader {
  #cardRecordsByKey = new DefaultMap<string, CardRecord[]>(() => []);

  #cardRecordsByDeck = new DefaultMap<Deck, CardRecord[]>(() => []);

  #cardStats = new DefaultMap<string, Record<string, CardStats>>(() => ({}));

  add(cardKey: string, deck: Deck, winrate: number, gameCount: number): void {
    if (!winrate) {
      return;
    }
    const cardRecord = { cardKey, deck, winrate, gameCount };
    this.#cardRecordsByKey.get(cardKey).push(cardRecord);
    this.#cardRecordsByDeck.get(deck).push(cardRecord);
  }

  #computeDeckGrades(): Map<Deck, number> {
    const meanWinrates = new Map<Deck, number>();
    for (const [deck, cardRecords] of this.#cardRecordsByDeck.entries()) {
      if (deck === Deck.ALL) {
        continue;
      }

      const filteredCardRecords = cardRecords.filter(
        ({ gameCount }) => gameCount >= MIN_GAMES_DRAWN_FOR_INFERENCE
      );
      if (filteredCardRecords.length <= 1) {
        continue;
      }

      const winrates = filteredCardRecords.map(
        (cardRecord) => cardRecord.winrate
      );
      const meanWinrate = mean(winrates);
      meanWinrates.set(deck, meanWinrate);
      const normalDistribution = new NormalDistribution(
        meanWinrate,
        std(winrates)
      );

      for (const cardRecord of filteredCardRecords) {
        const { cardKey, winrate, gameCount } = cardRecord;
        if (gameCount < MIN_GAMES_DRAWN) {
          continue;
        }
        const [score, grade] = computeGrade(normalDistribution, winrate);
        this.#cardStats.get(cardKey)[deck.code] = {
          winrate,
          gameCount,
          score,
          grade,
        };
      }
    }
    return meanWinrates;
  }

  #computeOverallGrades(meanWinrates: Map<Deck, number>): void {
    const adjustedWinrates: Record<string, [number, number]> = {};
    for (const [key, cardRecords] of this.#cardRecordsByKey.entries()) {
      let sum = 0;
      let adjustedGameCount = 0;
      for (const cardRecord of cardRecords) {
        if (cardRecord.deck === Deck.ALL) {
          continue;
        }
        const meanWinrate = meanWinrates.get(cardRecord.deck);
        if (meanWinrate === undefined) {
          continue;
        }
        sum += (cardRecord.winrate - meanWinrate) * cardRecord.gameCount;
        adjustedGameCount += cardRecord.gameCount;
      }

      adjustedWinrates[key] = [sum / adjustedGameCount, adjustedGameCount];
    }

    const winrates = Object.values(adjustedWinrates)
      .filter(([, gameCount]) => gameCount >= MIN_GAMES_DRAWN_FOR_INFERENCE)
      .map(([winrate]) => winrate);
    if (winrates.length <= 1) {
      return;
    }

    const normalDistribution = new NormalDistribution(
      mean(winrates),
      std(winrates)
    );

    for (const cardRecord of this.#cardRecordsByDeck.get(Deck.ALL)) {
      const { cardKey, winrate, gameCount } = cardRecord;
      const [adjustedWinrate, adjustedGameCount] = adjustedWinrates[cardKey]!;
      if (adjustedGameCount <= MIN_GAMES_DRAWN) {
        continue;
      }
      const [score, grade] = computeGrade(normalDistribution, adjustedWinrate);
      this.#cardStats.get(cardKey)[Deck.ALL.code] = {
        winrate,
        gameCount,
        score,
        grade,
      };
    }
  }

  computeGrades(): void {
    const meanWinrates = this.#computeDeckGrades();
    this.#computeOverallGrades(meanWinrates);
  }

  getCardStats(cardKey: string): Record<string, CardStats> {
    return this.#cardStats.get(cardKey);
  }
}

import { FILE_CACHE, POSTGRES_CACHE } from "./cache";
import { ALL_GRADES, DAY_IN_SECONDS } from "./constants";
import Deck from "./Deck";
import getCardStore from "./getCardStore";
import MagicSet from "./MagicSet";
import { generateIndex, INDEX_CACHE_KEY } from "./scryfall";
import { Format, Grade, Rarity } from "./types";
import { groupBy, sortBy } from "./util";
import { indexBy } from "./util.server";

const ACTIONS: Record<string, (output: any[]) => Promise<void>> = {
  "check-postgres-keys": async (output) => {
    for (const set of MagicSet.ALL) {
      const cardStore = await POSTGRES_CACHE.get(set.code);
      output.push(
        `${set.code.toUpperCase()}: ${cardStore ? "Cached" : "Not Cached"}`
      );
    }
  },
  "compare-file-and-postgres-scores": async (output) => {
    const set = MagicSet.NEW_CAPENNA;
    const pgCards = (
      await getCardStore(set, Format.PREMIER_DRAFT, POSTGRES_CACHE)
    ).cards;
    const fileCards = (
      await getCardStore(set, Format.PREMIER_DRAFT, FILE_CACHE)
    ).cards;
    const fileCardsByUrl = indexBy(fileCards, (card) => card.cardUrl);
    for (const pgCard of pgCards) {
      const fileCard = fileCardsByUrl[pgCard.cardUrl];
      if (!fileCard) {
        continue;
      }
      output.push(
        `${pgCard.name}\t${pgCard.rarity}\t${pgCard.stats.all?.score}\t${pgCard.stats.all?.grade}\t${fileCard.stats.all?.score}\t${fileCard.stats.all?.grade}`
      );
    }
  },
  "compute-grade-distributions": async (output) => {
    const { cards } = await getCardStore(
      MagicSet.NEW_CAPENNA,
      Format.PREMIER_DRAFT,
      FILE_CACHE
    );
    const cardsByGrade = groupBy(
      cards,
      (card) => card.stats[Deck.ALL.code]!.grade
    );
    for (const grade of ALL_GRADES) {
      const gradeCards = cardsByGrade[grade];
      output.push(`${grade}: ${gradeCards ? gradeCards.length : 0}`);
    }
  },
  "delete-cube-cache": async (output) => {
    const setCode = MagicSet.ARENA_CUBE.code;
    await POSTGRES_CACHE.delete(setCode);
    output.push(`${setCode.toUpperCase()} cache deleted`);
  },
  "delete-mh3-cache": async (output) => {
    const setCode = MagicSet.MODERN_HORIZONS_3.code;
    await POSTGRES_CACHE.delete(setCode);
    output.push(`${setCode.toUpperCase()} cache deleted!`);
  },
  "find-deck-outliers": async (output) => {
    let { cards } = await getCardStore(
      MagicSet.DOMINARIA_UNITED,
      Format.PREMIER_DRAFT,
      POSTGRES_CACHE
    );
    cards = cards.filter(
      (card) => card.rarity === Rarity.COMMON || card.rarity === Rarity.UNCOMMON
    );
    sortBy(
      cards,
      (card) => {
        const overallScore = card.stats[Deck.ALL.code]!.score;
        return Math.max(
          ...Object.values(card.stats).map((stats) =>
            Math.abs(stats.score - overallScore)
          )
        );
      },
      true
    );

    for (const card of cards.slice(0, 30)) {
      output.push(card.name);
    }
  },
  "populate-postgres-cache": async (output) => {
    for (const set of MagicSet.ALL) {
      await getCardStore(set, Format.PREMIER_DRAFT, POSTGRES_CACHE);
      output.push(`${set.code.toUpperCase()}: Cache Populated`);
    }
  },
  "populate-scryfall-index": async (output) => {
    const index = await generateIndex();
    await FILE_CACHE.set(INDEX_CACHE_KEY, index);
    await POSTGRES_CACHE.set(INDEX_CACHE_KEY, index, 30 * DAY_IN_SECONDS);
    output.push("Scryfall Index populated");
  },
  "update-file-cache": async (output) => {
    for (const set of MagicSet.ALL) {
      const cardStore = await POSTGRES_CACHE.get(set.code);
      if (cardStore) {
        output.push(`Updating file cache for ${set.code.toUpperCase()}`);
        await FILE_CACHE.set(set.code, cardStore);
      }
    }
    output.push("Done updating all file caches!");
  },
  "visualize-card-scores": async (output) => {
    const { cards } = await getCardStore(
      MagicSet.MIDNIGHT_HUNT,
      Format.PREMIER_DRAFT,
      FILE_CACHE
    );
    const sortedCards = sortBy(
      [...cards],
      (card) => -card.stats[Deck.ALL.code]!.score
    );

    let grade: Grade | undefined;
    for (const card of sortedCards) {
      const cardGrade = card.stats[Deck.ALL.code]!.grade;
      if (cardGrade !== grade) {
        grade = cardGrade;
        output.push(`${"=".repeat(20)} ${grade} ${"=".repeat(20)}`);
      }
      output.push(
        `${card.name}${" ".repeat(35 - card.name.length)}${
          card.stats[Deck.ALL.code]!.score
        }`
      );
    }
  },
};

export const ADMIN_ACTIONS =
  process.env.ADMIN_ENABLED === "true" ? ACTIONS : {};

export const ADMIN_ACTION_KEYS = Object.keys(ADMIN_ACTIONS);

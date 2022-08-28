import os from "os";
import path from "path";

import download from "download";

import { FILE_CACHE, REDIS_CACHE, REDIS_CLIENT } from "./cache";
import { ALL_GRADES } from "./constants";
import Deck from "./Deck";
import getCardStore from "./getCardStore";
import MagicSet from "./MagicSet";
import { generateIndexFile } from "./scryfall";
import { Grade } from "./types";
import { fetchJson, groupBy, sortBy } from "./util";
import { indexBy } from "./util.server";

interface ScryfallBulkData {
  download_uri: string;
}

const ACTIONS: Record<string, (output: any[]) => Promise<void>> = {
  "check-redis-keys": async (output) => {
    const client = await REDIS_CLIENT.get();
    for (const set of MagicSet.ALL) {
      const exists = await client.exists(set.code);
      output.push(
        `${set.code.toUpperCase()}: ${exists ? "Cached" : "Not Cached"}`
      );
    }
  },
  "clear-redis-cache": async (output) => {
    await REDIS_CACHE.clear();
    output.push("Redis cache cleared!");
  },
  "compare-file-and-redis-scores": async (output) => {
    const set = MagicSet.NEW_CAPENNA;
    const redisCards = (await getCardStore(set, REDIS_CACHE)).cards;
    const fileCards = (await getCardStore(set, FILE_CACHE)).cards;
    const fileCardsByUrl = indexBy(fileCards, (card) => card.cardUrl);
    for (const redisCard of redisCards) {
      const fileCard = fileCardsByUrl[redisCard.cardUrl];
      if (!fileCard) {
        continue;
      }
      output.push(
        `${redisCard.name}\t${redisCard.rarity}\t${redisCard.stats.all?.score}\t${redisCard.stats.all?.grade}\t${fileCard.stats.all?.score}\t${fileCard.stats.all?.grade}`
      );
    }
  },
  "compute-grade-distributions": async (output) => {
    const { cards } = await getCardStore(MagicSet.NEW_CAPENNA, FILE_CACHE);
    const cardsByGrade = groupBy(
      cards,
      (card) => card.stats[Deck.ALL.code]!.grade
    );
    for (const grade of ALL_GRADES) {
      const gradeCards = cardsByGrade[grade];
      output.push(`${grade}: ${gradeCards ? gradeCards.length : 0}`);
    }
  },
  "delete-snc-cache": async (output) => {
    const client = await REDIS_CLIENT.get();
    await client.del("snc");
    output.push("SNC cache value deleted!");
  },
  "generate-scryfall-index": async (output) => {
    const bulkData = await fetchJson<ScryfallBulkData>(
      "https://api.scryfall.com/bulk-data/oracle-cards"
    );
    const tempFolder = os.tmpdir();
    const tempFileName = "oracle_cards.json";
    await download(bulkData.download_uri, tempFolder, {
      filename: tempFileName,
    });

    const tempFilePath = path.join(tempFolder, tempFileName);
    await generateIndexFile(tempFilePath);
    output.push(`Scryfall index generated!`);
  },
  "populate-redis-cache": async (output) => {
    for (const set of MagicSet.ALL) {
      await getCardStore(set, REDIS_CACHE);
      output.push(`${set.code.toUpperCase()}: Cache Populated`);
    }
  },
  "update-file-cache": async (output) => {
    for (const set of MagicSet.ALL) {
      const cardStore = await REDIS_CACHE.get(set.code);
      if (cardStore) {
        output.push(`Updating file cache for ${set.code.toUpperCase()}`);
        await FILE_CACHE.set(set.code, cardStore);
      }
    }
    output.push("Done updating all file caches!");
  },
  "visualize-card-scores": async (output) => {
    const { cards } = await getCardStore(MagicSet.MIDNIGHT_HUNT, FILE_CACHE);
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

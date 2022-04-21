/* eslint-disable */

import { fetchScryfallIndex } from "lib/scryfall";
import { MagicSet } from "lib/types";

const main = async () => {
  const index = await fetchScryfallIndex(MagicSet.MIDNIGHT_HUNT);
  console.log(index.lookupCard("Organ Hoarder"));
};

main();

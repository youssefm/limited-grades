/* eslint-disable */

import { fetchScryfallIndex, SCRYFALL_FILE_INDEX } from "lib/scryfall";
import { MagicSet } from "lib/types";

const main = async () => {
  // const index = await fetchScryfallIndex(MagicSet.MIDNIGHT_HUNT);
  const index = await SCRYFALL_FILE_INDEX.get();
  console.log(index.lookupCard("Organ Hoarder"));
};

main();

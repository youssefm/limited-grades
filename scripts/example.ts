import { SCRYFALL_FILE_INDEX } from "lib/scryfall";

const main = async () => {
  const index = await SCRYFALL_FILE_INDEX.get();
  console.log(index.lookupCard("Organ Hoarder"));
};

main().catch((error) => {
  console.log(error);
});

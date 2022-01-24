import { FC } from "react";

import { ALL_RARITIES } from "lib/constants";
import { MagicSet, Rarity } from "lib/types";

import FilterLabel from "./FilterLabel";
import IconFilterGroup from "./IconFilterGroup";

const getFilters = (set: MagicSet) => [
  {
    label: "commons",
    values: [Rarity.COMMON],
    icon: `ss ss-2x ss-${set} ss-common dark:text-neutral-300`,
  },
  {
    label: "uncommons",
    values: [Rarity.UNCOMMON],
    icon: `ss ss-2x ss-${set} ss-uncommon`,
  },
  {
    label: "rares",
    values: [Rarity.RARE],
    icon: `ss ss-2x ss-${set} ss-rare`,
  },
  {
    label: "mythics",
    values: [Rarity.MYTHIC],
    icon: `ss ss-2x ss-${set} ss-mythic`,
  },
];

interface Props {
  set: MagicSet;
  values: Set<Rarity>;
  setValues: (rarities: Set<Rarity>) => void;
}

const RarityFilter: FC<Props> = ({ set, values, setValues }) => (
  <div>
    <FilterLabel>Rarity</FilterLabel>
    <IconFilterGroup
      values={values}
      setValues={setValues}
      filters={getFilters(set)}
    />
  </div>
);

export default RarityFilter;

import { FC } from "react";

import MagicSet from "lib/MagicSet";
import { Rarity } from "lib/types";

import IconFilterGroup from "./IconFilterGroup";

const getFilters = (set: MagicSet) => [
  {
    label: "commons",
    values: [Rarity.COMMON],
    icon: <set.Icon rarity={Rarity.COMMON} />,
  },
  {
    label: "uncommons",
    values: [Rarity.UNCOMMON],
    icon: <set.Icon rarity={Rarity.UNCOMMON} />,
  },
  {
    label: "rares",
    values: [Rarity.RARE],
    icon: <set.Icon rarity={Rarity.RARE} />,
  },
  {
    label: "mythics",
    values: [Rarity.MYTHIC],
    icon: <set.Icon rarity={Rarity.MYTHIC} />,
  },
];

interface Props {
  set: MagicSet;
  values: Set<Rarity>;
  setValues: (rarities: Set<Rarity>) => void;
}

const RarityFilter: FC<Props> = ({ set, values, setValues }) => (
  <IconFilterGroup
    values={values}
    setValues={setValues}
    filters={getFilters(set)}
  />
);

export default RarityFilter;

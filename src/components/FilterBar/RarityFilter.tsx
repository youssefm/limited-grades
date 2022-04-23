import clsx from "clsx";
import { FC } from "react";

import SetIcon from "components/common/SetIcon";
import MagicSet from "lib/sets";
import { TRANSITION_CLASSES } from "lib/styles";
import { Rarity } from "lib/types";

import IconFilterGroup from "./IconFilterGroup";

const getFilters = (set: MagicSet) => [
  {
    label: "commons",
    values: [Rarity.COMMON],
    icon: (
      <SetIcon
        set={set}
        className={clsx(
          "text-common dark:text-neutral-300",
          TRANSITION_CLASSES
        )}
      />
    ),
  },
  {
    label: "uncommons",
    values: [Rarity.UNCOMMON],
    icon: <SetIcon set={set} className="text-uncommon" />,
  },
  {
    label: "rares",
    values: [Rarity.RARE],
    icon: <SetIcon set={set} className="text-rare" />,
  },
  {
    label: "mythics",
    values: [Rarity.MYTHIC],
    icon: <SetIcon set={set} className="text-mythic" />,
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

import { FC } from "react";

import FilterLabel from "components/FilterLabel";
import IconFilterGroup from "components/IconFilterGroup";
import { ALL_RARITIES } from "lib/constants";
import { MagicSet, Rarity } from "lib/types";

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
      filters={ALL_RARITIES.map((rarity) => ({
        label: `${rarity}`,
        values: [rarity],
        icon: `ss ss-2x ss-fw ss-${set} ss-${rarity}`,
      }))}
    />
  </div>
);

export default RarityFilter;

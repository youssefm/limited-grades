import { FC } from "react";

import { ManaValue } from "lib/mana-value";

import IconFilterGroup, { Filter } from "./IconFilterGroup";

const FILTERS: Filter<ManaValue>[] = [
  {
    label: "1",
    values: [ManaValue.ONE],
    icon: "1",
  },
  {
    label: "2",
    values: [ManaValue.TWO],
    icon: "2",
  },
  {
    label: "3",
    values: [ManaValue.THREE],
    icon: "3",
  },
  {
    label: "4",
    values: [ManaValue.FOUR],
    icon: "4",
  },
  {
    label: "5",
    values: [ManaValue.FIVE],
    icon: "5",
  },
  {
    label: "6+",
    values: [ManaValue.SIX_PLUS],
    icon: (
      <div className="flex items-center gap-0.5">
        <div>6</div>
        <div className="pb-0.5 text-sm">+</div>
      </div>
    ),
  },
];

interface Props {
  values: Set<ManaValue>;
  setValues: (rarities: Set<ManaValue>) => void;
}

const ManaValueFilter: FC<Props> = ({ values, setValues }) => (
  <IconFilterGroup
    values={values}
    setValues={setValues}
    filters={FILTERS}
    className="text-lg font-semibold"
  />
);

export default ManaValueFilter;

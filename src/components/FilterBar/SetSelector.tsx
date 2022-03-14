import { FC } from "react";

import { ALL_SETS, SET_LABELS } from "lib/constants";
import { MagicSet } from "lib/types";

import FilterLabel from "./FilterLabel";
import IconSelect from "./IconSelect";

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
}

const SetSelector: FC<Props> = ({ value, onChange }) => (
  <label>
    <FilterLabel>Set</FilterLabel>
    <IconSelect
      value={value}
      onChange={onChange}
      options={ALL_SETS}
      getLabel={(set) => SET_LABELS[set]}
      getIcons={(set) => [`ss ss-fw ss-${set}`]}
      instanceId="set-select"
      className="min-w-[250px]"
    />
  </label>
);

export default SetSelector;

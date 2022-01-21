import { FC } from "react";

import FilterLabel from "components/FilterLabel";
import IconSelect from "components/IconSelect";
import { ALL_SETS, SET_LABELS } from "lib/constants";
import { MagicSet } from "lib/types";

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

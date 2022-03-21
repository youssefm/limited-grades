import clsx from "clsx";
import { FC } from "react";

import { ALL_SETS, SET_LABELS } from "lib/constants";
import { MagicSet } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
  className?: string;
}

const SetSelector: FC<Props> = ({ value, onChange, className }) => (
  <IconSelect
    value={value}
    onChange={onChange}
    options={ALL_SETS}
    getLabel={(set) => SET_LABELS[set]}
    getIcons={(set) => [`ss ss-fw ss-${set}`]}
    instanceId="set-select"
    className={clsx("min-w-[250px]", className)}
  />
);

export default SetSelector;

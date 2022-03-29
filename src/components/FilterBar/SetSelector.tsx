import clsx from "clsx";
import { FC, useCallback } from "react";

import SetIcon from "components/common/SetIcon";
import { ALL_SETS, SET_LABELS } from "lib/constants";
import { MagicSet } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
  className?: string;
}

const SetSelector: FC<Props> = ({ value, onChange, className }) => {
  const getIcon = useCallback(
    (set: MagicSet) => <SetIcon set={set} className="text-2xl" />,
    []
  );
  return (
    <IconSelect
      value={value}
      onChange={onChange}
      options={ALL_SETS}
      getLabel={(set) => SET_LABELS[set]}
      getIcon={getIcon}
      instanceId="set-select"
      className={clsx("min-w-[250px]", className)}
    />
  );
};

export default SetSelector;

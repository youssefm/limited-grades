import { FC, useCallback } from "react";

import SetIcon from "components/common/SetIcon";
import MagicSet from "lib/sets";

import IconSelect from "./IconSelect";

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
}

const SetSelector: FC<Props> = ({ value, onChange }) => {
  const getIcon = useCallback(
    (set: MagicSet) => <SetIcon set={set} className="text-2xl" />,
    []
  );
  return (
    <IconSelect
      value={value}
      onChange={(selectedValue) => {
        if (selectedValue) {
          onChange(selectedValue);
        }
      }}
      options={MagicSet.ALL.slice(1)}
      getLabel={(set) => set.label}
      getIcon={getIcon}
      instanceId="set-select"
      className="min-w-[230px] lg:min-w-[250px]"
    />
  );
};

export default SetSelector;

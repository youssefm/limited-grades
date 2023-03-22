import { FC, useCallback } from "react";

import MagicSet from "lib/MagicSet";

import IconSelect from "./IconSelect";

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
  inputId?: string;
}

const SetSelector: FC<Props> = ({ value, onChange, inputId }) => {
  const getIcon = useCallback(
    (set: MagicSet) => <set.Icon className="text-2xl" />,
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
      options={MagicSet.ALL}
      getLabel={(set) => set.label}
      getIcon={getIcon}
      instanceId="set-select"
      inputId={inputId}
      className="min-w-[230px] lg:min-w-[260px]"
    />
  );
};

export default SetSelector;

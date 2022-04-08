import { ReactNode, useCallback } from "react";

import Select, { Props as SelectProps } from "components/common/Select";

interface Props<T> extends SelectProps<T> {
  getIcon: (value: T) => ReactNode;
}

const IconSelect = <T extends unknown>({
  getIcon,
  ...extraProps
}: Props<T>) => {
  const formatOptionLabel = useCallback(
    ({ value, label }) => {
      const icon = getIcon(value);
      if (!icon) {
        return label;
      }

      return (
        <div className="flex">
          {icon}
          <span className="ml-2">{label}</span>
        </div>
      );
    },
    [getIcon]
  );

  return <Select formatOptionLabel={formatOptionLabel} {...extraProps} />;
};

export default IconSelect;

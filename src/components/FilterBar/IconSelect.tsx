import { FC, ReactElement, ReactNode, useCallback } from "react";
import { components, OptionProps, SingleValueProps } from "react-select";

import Select from "components/common/Select";

interface Props<T> {
  value: T;
  onChange: (selectedValue: T) => void;
  options: T[];
  getLabel: (value: T) => string;
  getIcon: (value: T) => ReactNode;
  instanceId: string;
  className?: string;
}

const IconSelect = <T extends unknown>({
  value,
  onChange,
  options,
  getLabel,
  getIcon,
  instanceId,
  className,
}: Props<T>) => {
  interface TOption {
    value: T;
    label: string;
  }

  const OptionView: FC<{ optionValue: T }> = useCallback(
    ({ optionValue, children }) => {
      const icon = getIcon(optionValue);
      if (!icon) {
        // This type assertion is not technically correct but this is a workaround
        // for a Typescript issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-485151038
        return children as ReactElement;
      }

      return (
        <div className="flex">
          {icon}
          <span className="ml-2">{children}</span>
        </div>
      );
    },
    [getIcon]
  );

  const SingleValue: FC<SingleValueProps<TOption, false>> = useCallback(
    ({ children, ...props }) => (
      <components.SingleValue {...props}>
        <OptionView optionValue={props.data.value}>{children}</OptionView>
      </components.SingleValue>
    ),
    [OptionView]
  );

  const Option: FC<OptionProps<TOption, false>> = useCallback(
    ({ children, ...props }) => (
      <components.Option {...props}>
        <OptionView optionValue={props.data.value}>{children}</OptionView>
      </components.Option>
    ),
    [OptionView]
  );

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      getLabel={getLabel}
      components={{ SingleValue, Option }}
      instanceId={instanceId}
      className={className}
    />
  );
};

export default IconSelect;

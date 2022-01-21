import { FC, useCallback } from "react";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

interface Props<T> {
  value: T;
  onChange: (selectedValue: T) => void;
  options: T[];
  getLabel: (value: T) => string;
  getIcon: (value: T) => string;
  instanceId: string;
  className: string;
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
    ({ optionValue, children }) => (
      <div className="flex items-center">
        <i className={getIcon(optionValue)} />
        <span className="ml-2">{children}</span>
      </div>
    ),
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
      value={{ value, label: getLabel(value) }}
      onChange={(selectedOption: TOption | null) => {
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
      options={options.map((option: T) => ({
        value: option,
        label: getLabel(option),
      }))}
      isMulti={false}
      components={{ SingleValue, Option }}
      instanceId={instanceId}
      className={className}
    />
  );
};

export default IconSelect;

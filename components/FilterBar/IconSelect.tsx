import { FC, ReactElement, useCallback } from "react";
import Select, {
  Colors,
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/stateManager";

import useDarkMode from "hooks/useDarkMode";

const getDarkModeColors = (baseColors: Colors) => ({
  neutral0: "#525252", // tailwind zinc-600
  neutral5: baseColors.neutral90,
  neutral10: baseColors.neutral90,
  neutral20: baseColors.neutral80,
  neutral30: baseColors.neutral70,
  neutral40: baseColors.neutral60,
  neutral50: baseColors.neutral50,
  neutral60: baseColors.neutral40,
  neutral70: baseColors.neutral30,
  neutral80: baseColors.neutral20,
  neutral90: baseColors.neutral10,
  primary: "#f59e0b", // tailwind amber-500
  primary75: "#ec9109",
  primary50: "#e28408",
  primary25: "#d97706", // tailwind amber-600
});

interface Props<T> {
  value: T;
  onChange: (selectedValue: T) => void;
  options: T[];
  getLabel: (value: T) => string;
  getIcons: (value: T) => string[];
  instanceId: string;
  className: string;
}

const IconSelect = <T extends unknown>({
  value,
  onChange,
  options,
  getLabel,
  getIcons,
  instanceId,
  className,
}: Props<T>) => {
  const [darkModeEnabled] = useDarkMode();

  interface TOption {
    value: T;
    label: string;
  }

  const OptionView: FC<{ optionValue: T }> = useCallback(
    ({ optionValue, children }) => {
      const icons = getIcons(optionValue);
      if (icons.length === 0) {
        // This type assertion is not technically correct but this is a workaround
        // for a Typescript issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-485151038
        return children as ReactElement;
      }

      return (
        <div className="flex items-center">
          {icons.map((icon) => (
            <i className={icon} key={icon} />
          ))}
          <span className="ml-2">{children}</span>
        </div>
      );
    },
    [getIcons]
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

  const selectProps: StateManagerProps<TOption, false> = {
    value: { value, label: getLabel(value) },
    onChange: (selectedOption: TOption | null) => {
      if (selectedOption) {
        onChange(selectedOption.value);
      }
    },
    options: options.map((option: T) => ({
      value: option,
      label: getLabel(option),
    })),
    isMulti: false,
    components: { SingleValue, Option },
    instanceId,
    className,
    styles: {
      option: (provided) => ({
        ...provided,
        cursor: "pointer",
      }),
    },
  };

  if (darkModeEnabled) {
    selectProps.theme = (theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        ...getDarkModeColors(theme.colors),
      },
    });
  }

  return <Select {...selectProps} />;
};

export default IconSelect;

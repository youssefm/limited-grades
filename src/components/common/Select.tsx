import { omit } from "lodash";
import ReactSelect, { Colors } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/stateManager";

import useDarkMode from "hooks/useDarkMode";

const getDarkModeColors = (baseColors: Colors) => ({
  neutral0: "#525252", // tailwind neutral-600
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
  primary: "#e78b09", // tailwind amber-550
  primary75: "#e28408",
  primary50: "#de7e07",
  primary25: "#d97706", // tailwind amber-600
});

interface Props<T>
  extends Omit<
    StateManagerProps<{ value: T; label: string }, false>,
    "value" | "onChange" | "options"
  > {
  value: T;
  onChange: (selectedValue: T) => void;
  options: T[];
  getLabel: (value: T) => string;
}

const Select = <T extends unknown>({
  value,
  onChange,
  options,
  getLabel,
  ...extraProps
}: Props<T>) => {
  const [darkModeEnabled] = useDarkMode();

  interface TOption {
    value: T;
    label: string;
  }

  const selectProps: StateManagerProps<TOption, false> = {
    ...extraProps,
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
    classNamePrefix: "rs",
    styles: {
      control: (provided) => ({
        ...provided,
        transitionDuration: "150ms",
        transitionProperty: "background-color border-color",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        transition: "color 150ms",
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        transition: "background-color 150ms",
      }),
      input: (provided) => omit(provided, "color"),
      option: (provided, state) => {
        const optionStyles = {
          ...provided,
          cursor: "pointer",
        };

        if (darkModeEnabled && state.isSelected) {
          delete optionStyles.color;
        }

        return optionStyles;
      },
      singleValue: (provided) => omit(provided, "color"),
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

  return <ReactSelect {...selectProps} />;
};

export default Select;

import { Ref } from "react";
import ReactSelect, {
  Colors,
  components,
  CSSObjectWithLabel,
  InputProps,
} from "react-select";
import ReactSelectRef from "react-select/dist/declarations/src/Select";
import { StateManagerProps } from "react-select/dist/declarations/src/stateManager";

import useDarkMode from "hooks/useDarkMode";

const TAILWIND_AMBER_550 = "#e78b09";

const getDarkModeColors = (baseColors: Colors): Partial<Colors> => ({
  neutral0: "#404040", // tailwind neutral-700
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
  primary: TAILWIND_AMBER_550,
  primary75: "#e28408",
  primary50: "#de7e07",
  primary25: "#d97706", // tailwind amber-600
});

export interface Props<T>
  extends Omit<
    StateManagerProps<{ value: T; label: string }, false>,
    "value" | "onChange" | "options"
  > {
  value: T | undefined;
  onChange: (selectedValue: T | undefined) => void;
  options: T[];
  getLabel: (value: T) => string;
  selectRef?: Ref<ReactSelectRef<{ value: T; label: string }, false>>;
}

export interface Option<T> {
  value: T;
  label: string;
}

const InputComponent = <T extends unknown>(
  props: InputProps<Option<T>, false>
): JSX.Element => <components.Input {...props} enterKeyHint="go" />;

const Select = <T extends unknown>({
  value,
  onChange,
  options,
  getLabel,
  selectRef,
  ...extraProps
}: Props<T>): JSX.Element => {
  const [darkModeEnabled] = useDarkMode();

  const { components: componentsProp, ...extraPropsWithoutComponents } =
    extraProps;

  const selectProps: StateManagerProps<Option<T>, false> = {
    ...extraPropsWithoutComponents,
    value: value ? { value, label: getLabel(value) } : undefined,
    onChange: (selectedOption: Option<T> | null) => {
      onChange(selectedOption?.value);
    },
    options: options.map((option: T) => ({
      value: option,
      label: getLabel(option),
    })),
    components: { ...componentsProp, Input: InputComponent },
    isMulti: false,
    classNamePrefix: "rs",
    styles: {
      control: (provided) => {
        const styles: CSSObjectWithLabel = {
          ...provided,
          cursor: "text",
          transitionDuration: "150ms",
          transitionProperty: "background-color border-color",
        };
        if (darkModeEnabled) {
          styles["&:hover"] = { borderColor: TAILWIND_AMBER_550 };
        }
        return styles;
      },
      dropdownIndicator: (provided) => ({
        ...provided,
        cursor: "pointer",
        transition: "color 150ms",
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        transition: "background-color 150ms",
      }),
      input: (provided) => {
        const { color, ...styles } = provided;
        return styles;
      },
      option: (provided, state) => {
        const styles = {
          ...provided,
          cursor: "pointer",
        };

        if (darkModeEnabled && state.isSelected) {
          delete styles.color;
        }

        return styles;
      },
      singleValue: (provided) => {
        const { color, ...styles } = provided;
        return styles;
      },
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

  return <ReactSelect ref={selectRef} {...selectProps} />;
};

export default Select;

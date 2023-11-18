import { FC, ReactElement, ReactNode, useCallback } from "react";
import { components, OptionProps, SingleValueProps } from "react-select";

import Select, { Option, Props as SelectProps } from "components/common/Select";

interface Props<T> extends SelectProps<T> {
  getIcon: (value: T) => ReactNode;
  formatOptionText?: (value: T, label: string) => ReactNode;
}
const IconSelect = <T extends unknown>({
  getIcon,
  formatOptionText,
  ...extraProps
}: Props<T>): JSX.Element => {
  const SingleValueView: FC<{ optionValue: T; children: ReactNode }> =
    useCallback(
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

  const OptionView: FC<{
    optionValue: T;
    optionLabel: string;
    children: ReactNode;
  }> = useCallback(
    ({ optionValue, optionLabel, children }) => (
      <SingleValueView optionValue={optionValue}>
        {formatOptionText
          ? formatOptionText(optionValue, optionLabel)
          : children}
      </SingleValueView>
    ),
    [SingleValueView, formatOptionText]
  );

  const SingleValueComponent: FC<SingleValueProps<Option<T>, false>> =
    useCallback(
      ({ children, ...props }) => (
        <components.SingleValue {...props}>
          <SingleValueView optionValue={props.data.value}>
            {children}
          </SingleValueView>
        </components.SingleValue>
      ),
      [SingleValueView]
    );

  const OptionComponent: FC<OptionProps<Option<T>, false>> = useCallback(
    ({ children, ...props }) => (
      <components.Option {...props}>
        <OptionView
          optionValue={props.data.value}
          optionLabel={props.data.label}
        >
          {children}
        </OptionView>
      </components.Option>
    ),
    [OptionView]
  );

  return (
    <Select
      components={{
        SingleValue: SingleValueComponent,
        Option: OptionComponent,
      }}
      {...extraProps}
    />
  );
};

export default IconSelect;

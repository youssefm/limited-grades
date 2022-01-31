import { FC } from "react";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

import FilterLabel from "components/FilterLabel";

type GradeOption = { value: string; label: string };
const GradeOptions = ["Original", "Shifted", "Current"];

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<GradeOption, false>) => (
  <components.SingleValue {...props}>
    <span className="ml-2">{children}</span>
  </components.SingleValue>
);

const Option: FC<OptionProps<GradeOption, false>> = (props) => (
  <components.Option {...props}>
    <span className="ml-2">{props.data.label}</span>
  </components.Option>
);

interface Props {
  value: string;
  onChange: (selectedValue: string) => void;
}

const GradeSelector: FC<Props> = ({ value, onChange }) => {
  return (
    <label>
      <FilterLabel>Grades</FilterLabel>
      <Select
        value={{ value: value, label: value }}
        onChange={(selectedOption) => {
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        options={Object.values(GradeOptions).map((grade) => ({
          value: grade,
          label: grade,
        }))}
        isMulti={false}
        components={{ Option, SingleValue }}
        instanceId="grade-select"
        className="min-w-[250px]"
      />
    </label>
  );
};

export default GradeSelector;

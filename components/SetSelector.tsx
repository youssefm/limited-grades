import { FC } from "react";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

import FilterLabel from "components/FilterLabel";
import { SET_LABELS } from "lib/constants";
import { MagicSet } from "lib/types";

type SetOption = { value: MagicSet; label: string };

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<SetOption, false>) => (
  <components.SingleValue {...props}>
    <i className={`ss ss-fw ss-${props.data.value}`} />
    <span className="ml-2">{children}</span>
  </components.SingleValue>
);

const Option: FC<OptionProps<SetOption, false>> = (props) => {
  const {
    data: { label, value },
  } = props;
  return (
    <components.Option {...props}>
      <i className={`ss ss-fw ss-${value}`} />
      <span className="ml-2">{label}</span>
    </components.Option>
  );
};

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
}

const SetSelector: FC<Props> = ({ value, onChange }) => (
  <label>
    <FilterLabel>Set</FilterLabel>
    <Select
      value={{ value, label: SET_LABELS[value] }}
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
      options={Object.values(MagicSet).map((set) => ({
        value: set,
        label: SET_LABELS[set],
      }))}
      isMulti={false}
      components={{ Option, SingleValue }}
      instanceId="set-select"
      className="min-w-[250px]"
    />
  </label>
);

export default SetSelector;

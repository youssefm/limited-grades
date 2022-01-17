import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

import { SET_LABELS } from "lib/constants";
import { MagicSet } from "lib/types";

// const SetSelect = styled(Select)`
//   min-width: 250px;
// ` as typeof Select;

// const OptionLabel = styled.span`
//   margin-left: 8px;
// `;

type SetOption = { value: MagicSet; label: string };

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<SetOption, false>) => (
  <components.SingleValue {...props}>
    <i className={`ss ss-fw ss-${props.data.value}`} />
    <span>{children}</span>
  </components.SingleValue>
);

const Option = (props: OptionProps<SetOption, false>) => (
  <components.Option {...props}>
    <i className={`ss ss-fw ss-${props.data.value}`} />
    <span>{props.data.label}</span>
  </components.Option>
);

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
}

const SetSelector = (props: Props) => {
  const { value, onChange } = props;

  return (
    <Select
      value={{ value: value, label: SET_LABELS[value] }}
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
    />
  );
};

export default SetSelector;

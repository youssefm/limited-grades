import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import styled from "styled-components";

import { MagicSet } from "lib/types";

const SET_LABELS: Record<MagicSet, string> = {
  [MagicSet.CRIMSON_VOW]: "Crimson Vow",
  [MagicSet.MIDNIGHT_HUNT]: "Midnight Hunt",
  [MagicSet.FORGOTTEN_REALM]: "Forgotten Realms",
  [MagicSet.STRIXHAVEN]: "Strixhaven",
  [MagicSet.KALDHEIM]: "Kaldheim",
  [MagicSet.ZENDIKAR]: "Zendikar Rising",
  [MagicSet.IKORIA]: "Ikoria",
  [MagicSet.WAR_OF_THE_SPARK]: "War of the Spark",
  [MagicSet.RAVNICA_ALLEGIANCE]: "Ravnica Allegiance",
  [MagicSet.GUILDS_OF_RAVNICA]: "Guilds of Ravnica",
  [MagicSet.DOMINARIA]: "Dominaria",
  [MagicSet.AMONKHET]: "Amonkhet",
  [MagicSet.KALADESH]: "Kaladesh",
  [MagicSet.ARENA_CUBE]: "Arena Cube",
};

const SetSelect = styled(Select)`
  min-width: 250px;
` as typeof Select;

const OptionLabel = styled.span`
  margin-left: 8px;
`;

type SetOption = { value: MagicSet; label: string };

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<SetOption, false>) => (
  <components.SingleValue {...props}>
    <i className={`ss ss-fw ss-${props.data.value}`} />
    <OptionLabel>{children}</OptionLabel>
  </components.SingleValue>
);

const Option = (props: OptionProps<SetOption, false>) => (
  <components.Option {...props}>
    <i className={`ss ss-fw ss-${props.data.value}`} />
    <OptionLabel>{props.data.label}</OptionLabel>
  </components.Option>
);

interface Props {
  value: MagicSet;
  onChange: (selectedValue: MagicSet) => void;
}

const SetSelector = (props: Props) => {
  const { value, onChange } = props;

  return (
    <SetSelect
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

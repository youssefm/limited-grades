import Select from "react-select";
import styled from "styled-components";

import { Set } from "../lib/types";

const SetSelect = styled(Select)`
  min-width: 250px;
`;

const SET_LABELS: Record<Set, string> = {
  [Set.CRIMSON_VOW]: "Crimson Vow",
  [Set.MIDNIGHT_HUNT]: "Midnight Hunt",
  [Set.FORGOTTEN_REALM]: "Forgotten Realms",
  [Set.STRIXHAVEN]: "Strixhaven",
  [Set.KALDHEIM]: "Kaldheim",
  [Set.ZENDIKAR]: "Zendikar Rising",
  [Set.IKORIA]: "Ikoria",
  [Set.WAR_OF_THE_SPARK]: "War of the Spark",
  [Set.RAVNICA_ALLEGIANCE]: "Ravnica Allegiance",
  [Set.GUILDS_OF_RAVNICA]: "Guilds of Ravnica",
  [Set.DOMINARIA]: "Dominaria",
  [Set.AMONKHET]: "Amonkhet",
  [Set.KALADESH]: "Kaladesh",
};

interface Props {
  value: Set;
  onChange: (selectedValue: Set) => void;
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
      options={Object.values(Set).map((set) => ({
        value: set,
        label: SET_LABELS[set],
      }))}
      instanceId="set-select"
    />
  );
};

export default SetSelector;

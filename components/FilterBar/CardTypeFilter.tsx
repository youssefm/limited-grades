import { FC } from "react";

import { CardType } from "lib/types";

import FilterLabel from "./FilterLabel";
import IconFilterGroup from "./IconFilterGroup";

const FILTERS = [
  {
    label: "creatures",
    values: [CardType.CREATURE],
    icon: "ms ms-2x ms-creature dark:text-black",
  },
  {
    label: "instants and sorceries",
    values: [CardType.INSTANT, CardType.SORCERY],
    icon: "ms ms-2x ms-instant dark:text-black",
  },
  {
    label: "artifacts, enchantments, and planeswalkers",
    values: [CardType.ARTIFACT, CardType.ENCHANTMENT, CardType.PLANESWALKER],
    icon: "ms ms-2x ms-enchantment dark:text-black",
  },
  {
    label: "lands",
    values: [CardType.LAND],
    icon: "ms ms-2x ms-land dark:text-black",
  },
];

interface Props {
  values: Set<CardType>;
  setValues: (cardTypes: Set<CardType>) => void;
}

const CardTypeFilter: FC<Props> = ({ values, setValues }) => (
  <div>
    <FilterLabel>Type</FilterLabel>
    <IconFilterGroup values={values} setValues={setValues} filters={FILTERS} />
  </div>
);

export default CardTypeFilter;

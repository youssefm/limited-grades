import { FC } from "react";

import FilterLabel from "components/FilterLabel";
import IconFilterGroup from "components/IconFilterGroup";
import { CardType } from "lib/types";

const FILTERS = [
  {
    label: "creatures",
    values: [CardType.CREATURE],
    icon: "ms ms-2x ms-creature w-[1.28571429em] text-center",
  },
  {
    label: "instants and sorceries",
    values: [CardType.INSTANT, CardType.SORCERY],
    icon: "ms ms-2x ms-instant w-[1.28571429em] text-center",
  },
  {
    label: "artifacts, enchantments, and planeswalkers",
    values: [CardType.ARTIFACT, CardType.ENCHANTMENT, CardType.PLANESWALKER],
    icon: "ms ms-2x ms-enchantment w-[1.28571429em] text-center",
  },
  {
    label: "lands",
    values: [CardType.LAND],
    icon: "ms ms-2x ms-land w-[1.28571429em] text-center",
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

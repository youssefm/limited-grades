import { FC } from "react";

import { CardType } from "lib/types";

import IconFilterGroup from "./IconFilterGroup";

const FILTERS = [
  {
    label: "creatures",
    values: [CardType.CREATURE],
    icon: "ms ms-creature",
  },
  {
    label: "instants and sorceries",
    values: [CardType.INSTANT, CardType.SORCERY],
    icon: "ms ms-instant",
  },
  {
    label: "artifacts, enchantments, and planeswalkers",
    values: [CardType.ARTIFACT, CardType.ENCHANTMENT, CardType.PLANESWALKER],
    icon: "ms ms-enchantment",
  },
  {
    label: "lands",
    values: [CardType.LAND],
    icon: "ms ms-land",
  },
];

interface Props {
  values: Set<CardType>;
  setValues: (cardTypes: Set<CardType>) => void;
  className?: string;
}

const CardTypeFilter: FC<Props> = ({ values, setValues, className }) => (
  <IconFilterGroup
    values={values}
    setValues={setValues}
    filters={FILTERS}
    className={className}
  />
);

export default CardTypeFilter;

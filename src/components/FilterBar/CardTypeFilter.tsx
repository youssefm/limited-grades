import { FC } from "react";

import { CardType } from "lib/types";

import IconFilterGroup from "./IconFilterGroup";

const FILTERS = [
  {
    label: "creatures",
    values: [CardType.CREATURE],
    icon: <i className="ms ms-creature" />,
  },
  {
    label: "instants and sorceries",
    values: [CardType.INSTANT, CardType.SORCERY],
    icon: <i className="ms ms-instant" />,
  },
  {
    label: "artifacts, enchantments, and planeswalkers",
    values: [CardType.ARTIFACT, CardType.ENCHANTMENT, CardType.PLANESWALKER],
    icon: <i className="ms ms-enchantment" />,
  },
  {
    label: "lands",
    values: [CardType.LAND],
    icon: <i className="ms ms-land" />,
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

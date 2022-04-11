import clsx from "clsx";
import CreatureIcon from "mana-font/svg/creature.svg";
import EnchantmentIcon from "mana-font/svg/enchantment.svg";
import InstantIcon from "mana-font/svg/instant.svg";
import LandIcon from "mana-font/svg/land.svg";
import { FC } from "react";

import { TRANSITION_CLASSES } from "lib/styles";
import { CardType } from "lib/types";

import IconFilterGroup from "./IconFilterGroup";

const ICON_PROPS = {
  width: "1.28571429em",
  height: "1em",
  className: clsx(
    "stroke-neutral-300 dark:stroke-black paint-order-stroke",
    TRANSITION_CLASSES
  ),
};

const FILTERS = [
  {
    label: "creatures",
    values: [CardType.CREATURE],
    icon: <CreatureIcon {...ICON_PROPS} />,
  },
  {
    label: "instants and sorceries",
    values: [CardType.INSTANT, CardType.SORCERY],
    icon: <InstantIcon {...ICON_PROPS} />,
  },
  {
    label: "artifacts, enchantments, and planeswalkers",
    values: [CardType.ARTIFACT, CardType.ENCHANTMENT, CardType.PLANESWALKER],
    icon: <EnchantmentIcon {...ICON_PROPS} />,
  },
  {
    label: "lands",
    values: [CardType.LAND],
    icon: <LandIcon {...ICON_PROPS} />,
  },
];

interface Props {
  values: Set<CardType>;
  setValues: (cardTypes: Set<CardType>) => void;
}

const CardTypeFilter: FC<Props> = ({ values, setValues }) => (
  <IconFilterGroup values={values} setValues={setValues} filters={FILTERS} />
);

export default CardTypeFilter;

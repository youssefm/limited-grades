import clsx from "clsx";
import { FC } from "react";

import MagicSet from "lib/MagicSet";
import { TRANSITION_CLASSES } from "lib/styles";

interface Props {
  set: MagicSet;
  className?: string;
}

const SetIcon: FC<Props> = ({ set, className }) => (
  <set.SvgIcon
    width="1.28571429em"
    height="1em"
    className={clsx(
      "stroke-neutral-300 dark:stroke-black paint-order-stroke",
      TRANSITION_CLASSES,
      className
    )}
  />
);

export default SetIcon;

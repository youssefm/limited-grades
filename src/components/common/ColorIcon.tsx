import clsx from "clsx";
import BlackIcon from "mana-font/svg/b.svg";
import ColorlessIcon from "mana-font/svg/c.svg";
import GreenIcon from "mana-font/svg/g.svg";
import RedIcon from "mana-font/svg/r.svg";
import BlueIcon from "mana-font/svg/u.svg";
import WhiteIcon from "mana-font/svg/w.svg";
import { FC, SVGProps } from "react";

import MulticolorIcon from "assets/multicolor.svg";
import { TRANSITION_CLASSES } from "lib/styles";
import { Color } from "lib/types";

const BG_COLOR_CLASSES: Record<Color, string> = {
  [Color.WHITE]: "p-[0.125em] bg-[#f0f2c0]",
  [Color.BLUE]: "p-[0.125em] bg-[#b5cde3]",
  [Color.BLACK]: "p-[0.125em] bg-[#aca29a]",
  [Color.RED]: "p-[0.125em] bg-[#db8664]",
  [Color.GREEN]: "p-[0.125em] bg-[#93b483]",
  [Color.MULTICOLOR]:
    "bg-gradient-to-tr from-[#cca54f] via-[#e0d3bb] to-[#cca54f]",
  [Color.COLORLESS]: "p-[0.125em] bg-[#beb9b2]",
};

const COLOR_ICONS: Record<Color, FC<SVGProps<SVGSVGElement>>> = {
  [Color.WHITE]: WhiteIcon,
  [Color.BLUE]: BlueIcon,
  [Color.BLACK]: BlackIcon,
  [Color.RED]: RedIcon,
  [Color.GREEN]: GreenIcon,
  [Color.MULTICOLOR]: MulticolorIcon,
  [Color.COLORLESS]: ColorlessIcon,
};

interface Props {
  color: Color;
  className?: string;
}

const ColorIcon: FC<Props> = ({ color, className }) => {
  const SvgIcon = COLOR_ICONS[color];
  return (
    // 1.375em = 1em + 0.125em padding * 2 + 0.0625em border * 2
    <SvgIcon
      width="1.375em"
      height="1.375em"
      className={clsx(
        "inline-block text-black rounded-full border-[0.0625em] border-neutral-300 dark:border-black",
        BG_COLOR_CLASSES[color],
        TRANSITION_CLASSES,
        className
      )}
    />
  );
};

export default ColorIcon;

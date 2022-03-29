import clsx from "clsx";
import BlackIcon from "mana-font/svg/b.svg";
import ColorlessIcon from "mana-font/svg/c.svg";
import GreenIcon from "mana-font/svg/g.svg";
import RedIcon from "mana-font/svg/r.svg";
import BlueIcon from "mana-font/svg/u.svg";
import WhiteIcon from "mana-font/svg/w.svg";
import { FC, SVGProps } from "react";

import MulticolorIcon from "assets/multicolor.svg";
import { Column } from "lib/types";

const BG_COLOR_CLASSES: Record<Column, string> = {
  [Column.WHITE]: "p-0.5 bg-[#f0f2c0]",
  [Column.BLUE]: "p-0.5 bg-[#b5cde3]",
  [Column.BLACK]: "p-0.5 bg-[#aca29a]",
  [Column.RED]: "p-0.5 bg-[#db8664]",
  [Column.GREEN]: "p-0.5 bg-[#93b483]",
  [Column.MULTICOLOR]: "bg-gradient-to-tr from-mc-start via-mc-mid to-mc-start",
  [Column.COLORLESS]: "p-0.5 bg-[#beb9b2]",
};

const COLOR_ICONS: Record<Column, FC<SVGProps<SVGSVGElement>>> = {
  [Column.WHITE]: WhiteIcon,
  [Column.BLUE]: BlueIcon,
  [Column.BLACK]: BlackIcon,
  [Column.RED]: RedIcon,
  [Column.GREEN]: GreenIcon,
  [Column.MULTICOLOR]: MulticolorIcon,
  [Column.COLORLESS]: ColorlessIcon,
};

interface Props {
  color: Column;
  className?: string;
}

const ColorIcon: FC<Props> = ({ color, className }) => {
  const SvgIcon = COLOR_ICONS[color];
  return (
    <SvgIcon
      width="1.25em"
      height="1.25em"
      className={clsx(
        "inline-block text-black rounded-full",
        BG_COLOR_CLASSES[color],
        className
      )}
    />
  );
};

export default ColorIcon;

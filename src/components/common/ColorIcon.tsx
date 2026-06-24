import clsx from "clsx";
import BlackIcon from "mana-font/svg/b.svg";
import ColorlessIcon from "mana-font/svg/c.svg";
import GreenIcon from "mana-font/svg/g.svg";
import RedIcon from "mana-font/svg/r.svg";
import BlueIcon from "mana-font/svg/u.svg";
import WhiteIcon from "mana-font/svg/w.svg";
import { FC, SVGProps } from "react";

import MulticolorIcon from "lib/MulticolorIcon";
import { TRANSITION_CLASSES } from "lib/styles";
import { Color } from "lib/types";

type GlyphColor = Exclude<Color, Color.MULTICOLOR>;

// The disc behind each glyph is drawn as a vector <circle> rather than a CSS
// rounded-full background: an SVG circle antialiases its edge more cleanly than
// a border-radius clip at small sizes (most visibly in Firefox), matching the
// crispness of the self-contained MulticolorIcon.
const DISC_COLORS: Record<GlyphColor, string> = {
  [Color.WHITE]: "#f0f2c0",
  [Color.BLUE]: "#b5cde3",
  [Color.BLACK]: "#aca29a",
  [Color.RED]: "#db8664",
  [Color.GREEN]: "#93b483",
  [Color.COLORLESS]: "#beb9b2",
};

const COLOR_ICONS: Record<GlyphColor, FC<SVGProps<SVGSVGElement>>> = {
  [Color.WHITE]: WhiteIcon,
  [Color.BLUE]: BlueIcon,
  [Color.BLACK]: BlackIcon,
  [Color.RED]: RedIcon,
  [Color.GREEN]: GreenIcon,
  [Color.COLORLESS]: ColorlessIcon,
};

interface Props {
  color: Color;
  className?: string;
}

const ColorIcon: FC<Props> = ({ color, className }) => {
  // 1.375em = 1em glyph + 0.125em padding * 2 + 0.0625em border * 2
  const containerClasses = clsx(
    "inline-block size-[1.375em] rounded-full border-[0.0625em] border-neutral-300 text-black dark:border-black",
    TRANSITION_CLASSES,
    className
  );

  // Multicolor bakes its own gradient disc and ring into a single SVG.
  if (color === Color.MULTICOLOR) {
    return <MulticolorIcon className={containerClasses} />;
  }

  // A single <svg> (one replaced element, like before) holding the disc circle
  // and the glyph nested inside it. The glyph is inset to 0.8 of the viewBox
  // (25.6 / 32), reproducing the previous 0.125em padding around a 1em glyph.
  const GlyphIcon = COLOR_ICONS[color];
  return (
    <svg viewBox="0 0 32 32" className={containerClasses}>
      <circle cx="16" cy="16" r="16" fill={DISC_COLORS[color]} />
      <GlyphIcon x="3.2" y="3.2" width="25.6" height="25.6" />
    </svg>
  );
};

export default ColorIcon;

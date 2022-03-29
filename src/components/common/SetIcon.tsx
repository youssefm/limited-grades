import AfrIcon from "keyrune/svg/afr.svg";
import AkrIcon from "keyrune/svg/akr.svg";
import DomIcon from "keyrune/svg/dom.svg";
import GrnIcon from "keyrune/svg/grn.svg";
import IkoIcon from "keyrune/svg/iko.svg";
import KhmIcon from "keyrune/svg/khm.svg";
import KlrIcon from "keyrune/svg/klr.svg";
import MidIcon from "keyrune/svg/mid.svg";
import NeoIcon from "keyrune/svg/neo.svg";
import DefaultIcon from "keyrune/svg/pmtg1.svg";
import RnaIcon from "keyrune/svg/rna.svg";
import StxIcon from "keyrune/svg/stx.svg";
import VowIcon from "keyrune/svg/vow.svg";
import WarIcon from "keyrune/svg/war.svg";
import ZnrIcon from "keyrune/svg/znr.svg";
import { FC, SVGProps } from "react";

import { MagicSet } from "lib/types";

const SET_ICONS: Record<MagicSet, FC<SVGProps<SVGSVGElement>>> = {
  [MagicSet.NEON_DYNASTY]: NeoIcon,
  [MagicSet.CRIMSON_VOW]: VowIcon,
  [MagicSet.MIDNIGHT_HUNT]: MidIcon,
  [MagicSet.FORGOTTEN_REALM]: AfrIcon,
  [MagicSet.STRIXHAVEN]: StxIcon,
  [MagicSet.KALDHEIM]: KhmIcon,
  [MagicSet.ZENDIKAR]: ZnrIcon,
  [MagicSet.IKORIA]: IkoIcon,
  [MagicSet.WAR_OF_THE_SPARK]: WarIcon,
  [MagicSet.RAVNICA_ALLEGIANCE]: RnaIcon,
  [MagicSet.GUILDS_OF_RAVNICA]: GrnIcon,
  [MagicSet.DOMINARIA]: DomIcon,
  [MagicSet.AMONKHET]: AkrIcon,
  [MagicSet.KALADESH]: KlrIcon,
  [MagicSet.ARENA_CUBE]: DefaultIcon,
  [MagicSet.DOUBLE_FEATURE]: DefaultIcon,
};

interface Props {
  set: MagicSet;
  className?: string;
}

const SetIcon: FC<Props> = ({ set, className }) => {
  const SvgIcon = SET_ICONS[set];
  return <SvgIcon width="1.28571429em" height="1em" className={className} />;
};

export default SetIcon;

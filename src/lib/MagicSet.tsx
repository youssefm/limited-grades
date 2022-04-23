import clsx from "clsx";
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
import SncIcon from "keyrune/svg/snc.svg";
import StxIcon from "keyrune/svg/stx.svg";
import VowIcon from "keyrune/svg/vow.svg";
import WarIcon from "keyrune/svg/war.svg";
import ZnrIcon from "keyrune/svg/znr.svg";
import { FC, ReactElement, SVGProps } from "react";

import Deck from "./Deck";
import { TRANSITION_CLASSES } from "./styles";

const RECENT_SET_THRESHOLD_IN_DAYS = 30;
const EMBARGO_DURATION_IN_DAYS = 12;

const TWO_COLOR_DECKS = [
  Deck.ALL,
  Deck.AZORIUS,
  Deck.DIMIR,
  Deck.RAKDOS,
  Deck.GRUUL,
  Deck.SELESNYA,
  Deck.ORZHOV,
  Deck.IZZET,
  Deck.GOLGARI,
  Deck.BOROS,
  Deck.SIMIC,
];

const computeDaysSinceDate = (dateString: string): number =>
  (Date.now() - new Date(dateString).getTime()) / (24 * 60 * 60 * 1000);

export default class MagicSet {
  readonly code: string;

  readonly label: string;

  readonly startDate: string;

  #SvgIcon: FC<SVGProps<SVGSVGElement>>;

  readonly decks: Deck[];

  static #setsByCode: Record<string, MagicSet> = {};

  static ALL: MagicSet[] = [];

  static NEW_CAPENNA = new MagicSet(
    "snc",
    "New Capenna",
    "2022-04-28",
    SncIcon
  );

  static NEON_DYNASTY = new MagicSet(
    "neo",
    "Neon Dynasty",
    "2022-02-10",
    NeoIcon
  );

  static CRIMSON_VOW = new MagicSet(
    "vow",
    "Crimson Vow",
    "2021-11-11",
    VowIcon
  );

  static MIDNIGHT_HUNT = new MagicSet(
    "mid",
    "Midnight Hunt",
    "2021-09-16",
    MidIcon
  );

  static FORGOTTEN_REALM = new MagicSet(
    "afr",
    "Forgotten Realms",
    "2021-07-08",
    AfrIcon
  );

  static STRIXHAVEN = new MagicSet("stx", "Strixhaven", "2021-04-15", StxIcon, [
    Deck.ALL,
    Deck.ORZHOV,
    Deck.IZZET,
    Deck.GOLGARI,
    Deck.BOROS,
    Deck.SIMIC,
  ]);

  static KALDHEIM = new MagicSet("khm", "Kaldheim", "2021-01-28", KhmIcon);

  static ZENDIKAR = new MagicSet(
    "znr",
    "Zendikar Rising",
    "2020-09-17",
    ZnrIcon
  );

  static IKORIA = new MagicSet("iko", "Ikoria", "2020-04-16", IkoIcon);

  static WAR_OF_THE_SPARK = new MagicSet(
    "war",
    "War of the Spark",
    "2020-04-16",
    WarIcon
  );

  static RAVNICA_ALLEGIANCE = new MagicSet(
    "rna",
    "Ravnica Allegiance",
    "2020-04-16",
    RnaIcon,
    [Deck.ALL, Deck.AZORIUS, Deck.RAKDOS, Deck.GRUUL, Deck.ORZHOV, Deck.SIMIC]
  );

  static GUILDS_OF_RAVNICA = new MagicSet(
    "grn",
    "Guilds of Ravnica",
    "2020-04-16",
    GrnIcon,
    [Deck.ALL, Deck.DIMIR, Deck.SELESNYA, Deck.IZZET, Deck.GOLGARI, Deck.BOROS]
  );

  static DOMINARIA = new MagicSet("dom", "Dominaria", "2020-04-16", DomIcon);

  static AMONKHET = new MagicSet("akr", "Amonkhet", "2020-08-13", AkrIcon);

  static KALADESH = new MagicSet("klr", "Kaladesh", "2020-11-12", KlrIcon);

  static ARENA_CUBE = new MagicSet(
    "cube",
    "Arena Cube",
    "2022-01-06",
    DefaultIcon
  );

  static DOUBLE_FEATURE = new MagicSet(
    "dbl",
    "Double Feature",
    "2022-01-28",
    DefaultIcon
  );

  private constructor(
    code: string,
    label: string,
    startDate: string,
    SvgIcon: FC<SVGProps<SVGSVGElement>>,
    decks = TWO_COLOR_DECKS
  ) {
    this.code = code;
    this.label = label;
    this.startDate = startDate;
    this.#SvgIcon = SvgIcon;
    this.decks = decks;
    MagicSet.#setsByCode[code] = this;
    MagicSet.ALL.push(this);

    // React components don't auto-bind methods to themselves, we need to this manually
    this.Icon = this.Icon.bind(this);
  }

  static lookup(code: string) {
    return MagicSet.#setsByCode[code];
  }

  isRecent(): boolean {
    return computeDaysSinceDate(this.startDate) < RECENT_SET_THRESHOLD_IN_DAYS;
  }

  isUnderEmbargo(): boolean {
    return computeDaysSinceDate(this.startDate) < EMBARGO_DURATION_IN_DAYS;
  }

  Icon({ className }: { className: string }): ReactElement {
    const SvgIcon = this.#SvgIcon;
    return (
      <SvgIcon
        width="1.28571429em"
        height="1em"
        className={clsx(
          "stroke-neutral-300 dark:stroke-black paint-order-stroke",
          TRANSITION_CLASSES,
          className
        )}
      />
    );
  }
}

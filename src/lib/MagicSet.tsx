import clsx from "clsx";
import { ReactElement, useContext } from "react";

import Deck from "./Deck";
import GradientIcon from "./GradientIcon";
import SetIconDataContext from "./SetIconDataContext";
// eslint-disable-next-line import/no-cycle
import { getSetIconData, preloadSetIcons } from "./setIconLoader";
import { TRANSITION_CLASSES } from "./styles";
import { Format, Rarity } from "./types";

const RECENT_SET_THRESHOLD_IN_DAYS = 30;

// Kick off loading of all icon data immediately on module init
preloadSetIcons();

const RARITY_ICON_CLASSES: Record<Rarity, string> = {
  [Rarity.COMMON]: "",
  [Rarity.UNCOMMON]: "icon-uncommon",
  [Rarity.RARE]: "icon-rare",
  [Rarity.MYTHIC]: "icon-mythic",
};

const computeDaysSinceDate = (dateString: string): number =>
  (Date.now() - new Date(dateString).getTime()) / (24 * 60 * 60 * 1000);

interface IconProps {
  rarity?: Rarity;
  className?: string;
}

const SetIcon = ({
  code,
  rarity,
  className,
}: { code: string } & IconProps): ReactElement | null => {
  const eagerData = useContext(SetIconDataContext);
  const iconData = eagerData[code] ?? getSetIconData(code);
  if (!iconData) return null;

  return (
    <GradientIcon
      viewBox={iconData.viewBox}
      width="1.28571429em"
      height="1em"
      className={clsx(
        "paint-order-stroke stroke-neutral-300 dark:stroke-black",
        rarity && RARITY_ICON_CLASSES[rarity],
        TRANSITION_CLASSES,
        className
      )}
    >
      {iconData.paths.map((d) => (
        <path key={d.slice(0, 20)} d={d} />
      ))}
    </GradientIcon>
  );
};

export default class MagicSet {
  readonly code: string;
  readonly code17Lands?: string;
  readonly label: string;
  readonly startDate: string;
  readonly format: Format;
  readonly decks: Deck[] = [];
  readonly customDeckLabels: Record<string, string> = {};
  static #setsByCode: Record<string, MagicSet> = {};
  static ALL: MagicSet[] = [];

  static SECRETS_OF_STRIXHAVEN = new MagicSet(
    "sos",
    "Secrets of Strixhaven",
    "2026-04-21",
    [
      [Deck.ORZHOV, "Silverquill"],
      [Deck.IZZET, "Prismari"],
      [Deck.GOLGARI, "Witherbloom"],
      [Deck.BOROS, "Lorehold"],
      [Deck.SIMIC, "Quandrix"],
    ]
  );

  static TEENAGE_MUTANT_NINJA_TURTLES = new MagicSet(
    "tmt",
    "Ninja Turtles",
    "2026-03-03",
    [Deck.ORZHOV, Deck.IZZET, Deck.GOLGARI, Deck.BOROS, Deck.SIMIC]
  );

  static LORWYN_ECLIPSED = new MagicSet("ecl", "Lorwyn Eclipsed", "2026-01-20");

  static AVATAR = new MagicSet("tla", "Avatar", "2025-11-18");

  static POWERED_CUBE = new MagicSet(
    "powered",
    "Powered Cube",
    "2025-10-28",
    Deck.TWO_COLOR_DECKS,
    Format.PREMIER_DRAFT,
    "cube - powered"
  );

  static THROUGH_THE_OMENPATHS = new MagicSet(
    "om1",
    "Through the Omenpaths",
    "2025-09-22",
    Deck.TWO_COLOR_DECKS,
    Format.PICK_TWO_DRAFT
  );

  static EDGE_OF_ETERNITIES = new MagicSet(
    "eoe",
    "Edge of Eternities",
    "2025-07-29"
  );

  static FINAL_FANTASY = new MagicSet("fin", "Final Fantasy", "2025-06-10");

  static TARKIR_DRAGONSTORM = new MagicSet("tdm", "Dragonstorm", "2025-04-08", [
    Deck.ABZAN,
    Deck.JESKAI,
    Deck.SULTAI,
    Deck.MARDU,
    Deck.TEMUR,
    Deck.ORZHOV,
    Deck.IZZET,
    Deck.GOLGARI,
    Deck.BOROS,
    Deck.SIMIC,
  ]);

  static AETHERDRIFT = new MagicSet("dft", "Aetherdrift", "2025-02-11");

  static PIONEER_MASTERS = new MagicSet("pio", "Pioneer Masters", "2024-12-10");

  static FOUNDATIONS = new MagicSet("fdn", "Foundations", "2024-11-12");

  static DUSKMOURN = new MagicSet("dsk", "Duskmourn", "2024-09-24");

  static BLOOMBURROW = new MagicSet("blb", "Bloomburrow", "2024-07-30");

  static MODERN_HORIZONS_3 = new MagicSet(
    "mh3",
    "Modern Horizons 3",
    "2024-06-11"
  );

  static THUNDER_JUNCTION = new MagicSet(
    "otj",
    "Thunder Junction",
    "2024-04-16"
  );

  static KARLOV_MANOR = new MagicSet("mkm", "Karlov Manor", "2024-02-06");

  static CAVERNS_OF_IXALAN = new MagicSet(
    "lci",
    "Caverns of Ixalan",
    "2023-11-14"
  );

  static WILDS_OF_ELDRAINE = new MagicSet(
    "woe",
    "Wilds of Eldraine",
    "2023-09-05"
  );

  static LORD_OF_THE_RINGS = new MagicSet(
    "ltr",
    "Lord of the Rings",
    "2023-06-20"
  );

  static MARCH_OF_THE_MACHINE = new MagicSet(
    "mom",
    "March of the Machine",
    "2023-04-18"
  );

  static ALL_WILL_BE_ONE = new MagicSet("one", "All Will Be One", "2023-02-07");

  static BROTHERS_WAR = new MagicSet("bro", "Brothers' War", "2022-11-15");

  static DOMINARIA_UNITED = new MagicSet(
    "dmu",
    "Dominaria United",
    "2022-09-01"
  );

  static BALDURS_GATE = new MagicSet("hbg", "Baldur's Gate", "2022-07-07");

  static NEW_CAPENNA = new MagicSet("snc", "New Capenna", "2022-04-28", [
    [Deck.ESPER, "Obscura"],
    [Deck.GRIXIS, "Maestros"],
    [Deck.JUND, "Riveteers"],
    [Deck.NAYA, "Cabaretti"],
    [Deck.BANT, "Brokers"],
    Deck.AZORIUS,
    Deck.DIMIR,
    Deck.RAKDOS,
    Deck.GRUUL,
    Deck.SELESNYA,
  ]);

  static NEON_DYNASTY = new MagicSet("neo", "Neon Dynasty", "2022-02-10");

  static CRIMSON_VOW = new MagicSet("vow", "Crimson Vow", "2021-11-11");

  static MIDNIGHT_HUNT = new MagicSet("mid", "Midnight Hunt", "2021-09-16");

  static FORGOTTEN_REALM = new MagicSet(
    "afr",
    "Forgotten Realms",
    "2021-07-08"
  );

  static STRIXHAVEN = new MagicSet("stx", "Strixhaven", "2021-04-15", [
    [Deck.ORZHOV, "Silverquill"],
    [Deck.IZZET, "Prismari"],
    [Deck.GOLGARI, "Witherbloom"],
    [Deck.BOROS, "Lorehold"],
    [Deck.SIMIC, "Quandrix"],
  ]);

  static KALDHEIM = new MagicSet("khm", "Kaldheim", "2021-01-28");

  static ZENDIKAR = new MagicSet("znr", "Zendikar Rising", "2020-09-17");

  static IKORIA = new MagicSet("iko", "Ikoria", "2020-04-16");

  static THEROS_BEYOND_DEATH = new MagicSet(
    "thb",
    "Theros Beyond Death",
    "2020-04-16"
  );

  static ELDRAINE = new MagicSet(
    "eld",
    "Throne of Eldraine",
    "2020-04-16",
    Deck.MONO_COLOR_DECKS.concat(Deck.TWO_COLOR_DECKS)
  );

  static WAR_OF_THE_SPARK = new MagicSet(
    "war",
    "War of the Spark",
    "2020-04-16"
  );

  static RAVNICA_ALLEGIANCE = new MagicSet(
    "rna",
    "Ravnica Allegiance",
    "2020-04-16",
    [Deck.AZORIUS, Deck.RAKDOS, Deck.GRUUL, Deck.ORZHOV, Deck.SIMIC]
  );

  static GUILDS_OF_RAVNICA = new MagicSet(
    "grn",
    "Guilds of Ravnica",
    "2020-04-16",
    [Deck.DIMIR, Deck.SELESNYA, Deck.IZZET, Deck.GOLGARI, Deck.BOROS]
  );

  static DOMINARIA = new MagicSet("dom", "Dominaria", "2020-04-16");

  static AMONKHET = new MagicSet("akr", "Amonkhet", "2020-08-13");

  static KALADESH = new MagicSet("klr", "Kaladesh", "2020-11-12");

  static SHADOWS_OVER_INNISTRAD = new MagicSet(
    "sir",
    "Shadows over Innistrad",
    "2023-03-21"
  );

  static KHANS_OF_TARKIR = new MagicSet(
    "ktk",
    "Khans of Tarkir",
    "2023-12-12",
    [
      Deck.ABZAN,
      Deck.JESKAI,
      Deck.SULTAI,
      Deck.MARDU,
      Deck.TEMUR,
      Deck.ORZHOV,
      Deck.IZZET,
      Deck.GOLGARI,
      Deck.BOROS,
      Deck.SIMIC,
    ]
  );

  static ARENA_CUBE = new MagicSet("cube", "Arena Cube", "2024-10-29");

  static REMIX_ARTIFACTS = new MagicSet(
    "chaos",
    "Remix: Artifacts",
    "2024-04-02"
  );

  private constructor(
    code: string,
    label: string,
    startDate: string,
    decks: (Deck | [Deck, string])[] = Deck.TWO_COLOR_DECKS,
    format: Format = Format.PREMIER_DRAFT,
    code17Lands?: string
  ) {
    this.code = code;
    this.code17Lands = code17Lands;
    this.label = label;
    this.startDate = startDate;
    this.format = format;

    for (const item of decks) {
      if (Array.isArray(item)) {
        const [deck, customLabel] = item;
        this.decks.push(deck);
        this.customDeckLabels[deck.code] = customLabel;
      } else {
        this.decks.push(item);
      }
    }

    MagicSet.#setsByCode[code] = this;
    MagicSet.ALL.push(this);
  }

  static lookup(code: string): MagicSet | undefined {
    return MagicSet.#setsByCode[code];
  }

  getDeckLabel(deck: Deck): string {
    return this.customDeckLabels[deck.code] || deck.defaultLabel;
  }

  isRecent(): boolean {
    return computeDaysSinceDate(this.startDate) < RECENT_SET_THRESHOLD_IN_DAYS;
  }

  Icon = ({ rarity, className }: IconProps): ReactElement | null => (
    <SetIcon code={this.code} rarity={rarity} className={className} />
  );
}

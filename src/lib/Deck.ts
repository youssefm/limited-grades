import { Color } from "./types";

export default class Deck {
  readonly code: string;
  readonly defaultLabel: string;
  readonly colors: Color[];
  static #decksByCode: Record<string, Deck> = {};
  static ALL = new Deck("all", "All decks", []);
  static MONO_WHITE = new Deck("w", "Mono White", [Color.WHITE]);
  static MONO_BLUE = new Deck("u", "Mono Blue", [Color.BLUE]);
  static MONO_BLACK = new Deck("b", "Mono Black", [Color.BLACK]);
  static MONO_RED = new Deck("r", "Mono Red", [Color.RED]);
  static MONO_GREEN = new Deck("g", "Mono Green", [Color.GREEN]);
  static AZORIUS = new Deck("wu", "Azorius", [Color.WHITE, Color.BLUE]);
  static DIMIR = new Deck("ub", "Dimir", [Color.BLUE, Color.BLACK]);
  static RAKDOS = new Deck("br", "Rakdos", [Color.BLACK, Color.RED]);
  static GRUUL = new Deck("rg", "Gruul", [Color.RED, Color.GREEN]);
  static SELESNYA = new Deck("wg", "Selesnya", [Color.GREEN, Color.WHITE]);
  static ORZHOV = new Deck("wb", "Orzhov", [Color.WHITE, Color.BLACK]);
  static IZZET = new Deck("ur", "Izzet", [Color.BLUE, Color.RED]);
  static GOLGARI = new Deck("bg", "Golgari", [Color.BLACK, Color.GREEN]);
  static BOROS = new Deck("wr", "Boros", [Color.RED, Color.WHITE]);
  static SIMIC = new Deck("ug", "Simic", [Color.GREEN, Color.BLUE]);

  static ESPER = new Deck("wub", "Esper", [
    Color.WHITE,
    Color.BLUE,
    Color.BLACK,
  ]);

  static GRIXIS = new Deck("ubr", "Grixis", [
    Color.BLUE,
    Color.BLACK,
    Color.RED,
  ]);

  static JUND = new Deck("brg", "Jund", [Color.BLACK, Color.RED, Color.GREEN]);
  static NAYA = new Deck("wrg", "Naya", [Color.RED, Color.GREEN, Color.WHITE]);
  static BANT = new Deck("wug", "Bant", [Color.GREEN, Color.WHITE, Color.BLUE]);

  static MONO_COLOR_DECKS = [
    Deck.MONO_WHITE,
    Deck.MONO_BLUE,
    Deck.MONO_BLACK,
    Deck.MONO_RED,
    Deck.MONO_GREEN,
  ];

  static TWO_COLOR_DECKS = [
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

  private constructor(code: string, defaultLabel: string, colors: Color[]) {
    this.code = code;
    this.defaultLabel = defaultLabel;
    this.colors = colors;
    Deck.#decksByCode[code] = this;
  }

  static lookup(code: string): Deck | undefined {
    return Deck.#decksByCode[code];
  }
}

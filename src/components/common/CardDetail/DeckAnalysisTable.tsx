import clsx from "clsx";
import React, { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import Center from "components/common/Center";
import Collapsible from "components/common/Collapsible";
import ColorIcon from "components/common/ColorIcon";
import { DECK_COLORS } from "lib/constants";
import {
  GRADE_BG_COLORS,
  GRADE_BORDER_COLORS,
  HOVER_CLASSES,
  TRANSITION_CLASSES,
} from "lib/styles";
import { Card, CardStats, Deck } from "lib/types";
import { formatPercentage, sortBy } from "lib/util";

const DECKS_TO_SHOW = 5;
const ROW_HEADER_CLASSES = "w-24 bg-neutral-100 dark:bg-neutral-800";

const DeckStatsRow = ({
  deck,
  stats,
  showStats,
}: {
  deck: Deck;
  stats: CardStats;
  showStats: boolean;
}) => (
  <div className="flex">
    <Center
      className={clsx("shrink-0 p-2 text-xl font-bold", ROW_HEADER_CLASSES)}
    >
      {deck === Deck.ALL ? (
        <span>AVG</span>
      ) : (
        <div>
          {DECK_COLORS[deck].map((column) => (
            <ColorIcon key={column} color={column} className="mr-1 last:mr-0" />
          ))}
        </div>
      )}
    </Center>
    <div className="grow py-2 px-4">
      <div className="flex">
        <div
          className={clsx(
            "py-3 mx-auto text-2xl font-bold text-black",
            {
              "pl-4 w-16": showStats,
              "pl-12 w-32": !showStats,
            },
            GRADE_BG_COLORS[stats.grade]
          )}
        >
          {stats.grade}
        </div>
        {showStats && (
          <Center
            className={clsx("grow border", GRADE_BORDER_COLORS[stats.grade])}
          >
            <div className="px-4 font-mono text-xl">
              {formatPercentage(stats.winrate)}
            </div>
          </Center>
        )}
      </div>
    </div>
  </div>
);

const Spacer: FC = () => <div className={clsx("h-2", ROW_HEADER_CLASSES)} />;

interface Props {
  card: Card;
  showStats: boolean;
}

const DeckAnalysisTable: FC<Props> = ({ card, showStats }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const deckStats = Object.entries(card.stats);
  sortBy(deckStats, ([, stats]) => stats.gameCount, true);
  const deckStatsToShow = deckStats.slice(0, DECKS_TO_SHOW);
  const deckStatsToExpand = deckStats.slice(DECKS_TO_SHOW);

  return (
    <>
      <div className="border border-neutral-200 dark:border-black">
        <Spacer />
        {deckStatsToShow.map(([deck, stats]) => (
          <DeckStatsRow
            key={deck}
            deck={deck as Deck}
            stats={stats}
            showStats={showStats}
          />
        ))}
        <Collapsible isExpanded={isExpanded}>
          {deckStatsToExpand.map(([deck, stats]) => (
            <DeckStatsRow
              key={deck}
              deck={deck as Deck}
              stats={stats}
              showStats={showStats}
            />
          ))}
        </Collapsible>
        <Spacer />
      </div>
      <Collapsible
        isExpanded={!isExpanded}
        // Allow expand button to always take up space so that
        // the parent element always has the same fixed height
        className={clsx({ invisible: deckStatsToExpand.length === 0 })}
      >
        <button
          className={clsx(
            "pt-1 w-full text-neutral-300 dark:text-neutral-700",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          onClick={() => setIsExpanded(true)}
          type="button"
          aria-label="More deck stats"
        >
          <FaChevronDown className="mx-auto" />
        </button>
      </Collapsible>
    </>
  );
};

export default DeckAnalysisTable;

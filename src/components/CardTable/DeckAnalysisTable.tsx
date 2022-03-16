import clsx from "clsx";
import { sortBy } from "lodash";
import React, { FC } from "react";

import {
  COLUMN_ICONS,
  DECK_COLORS,
  GRADE_BG_COLORS,
  GRADE_BORDER_COLORS,
} from "lib/constants";
import { Card, Deck } from "lib/types";
import { formatPercentage } from "lib/util";

interface Props {
  card: Card;
  showStats: boolean;
}

const DeckAnalysisTable: FC<Props> = ({ card, showStats }) => (
  <table className="w-full border border-neutral-200 dark:border-black">
    <tbody>
      {sortBy(Object.entries(card.stats), ([, stats]) => -stats.gameCount).map(
        ([deck, stats]) => {
          const deckColors = DECK_COLORS[deck as Deck];
          const winrate = formatPercentage(stats.winrate);
          return (
            <tr key={deck} className="group">
              <th className="p-2 group-first:pt-4 group-last:pb-4 w-24 text-xl bg-neutral-100 dark:bg-neutral-800">
                {deck === Deck.ALL ? (
                  <span>AVG</span>
                ) : (
                  <div className="inline-block">
                    {deckColors.map((column) => (
                      <i
                        key={column}
                        className={clsx(COLUMN_ICONS[column], "mr-1 last:mr-0")}
                      />
                    ))}
                  </div>
                )}
              </th>
              <td className="py-2 px-4 group-first:pt-4 group-last:pb-4">
                <div className="flex justify-center">
                  <div
                    className={clsx(
                      "py-3 text-2xl font-bold dark:text-black",
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
                    <div
                      className={clsx(
                        "flex grow justify-center items-center border",
                        GRADE_BORDER_COLORS[stats.grade]
                      )}
                    >
                      <div className="font-mono text-xl">{winrate}</div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  </table>
);

export default DeckAnalysisTable;

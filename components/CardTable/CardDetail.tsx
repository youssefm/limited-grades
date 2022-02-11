import clsx from "clsx";
import { sortBy } from "lodash";
import { FC } from "react";

import {
  COLUMN_ICONS,
  DECK_COLORS,
  GRADE_BG_COLORS,
  GRADE_BORDER_COLORS,
} from "lib/constants";
import { Card, Deck } from "lib/types";
import { formatPercentage, formatPercentageDifference } from "lib/util";

const StatsRow: FC<{ label: string; className?: string }> = ({
  label,
  className,
  children,
}) => (
  <tr className={className}>
    <td className="py-2 pl-4 text-left">{label}</td>
    <td className="pr-4 font-mono text-sm text-right">{children}</td>
  </tr>
);

interface Props {
  card: Card;
}

const CardDetail: FC<Props> = ({ card }) => (
  <div className="flex flex-col gap-6 md:flex-row">
    <img
      src={card.cardUrl}
      alt={card.name}
      width="240"
      height="340"
      className="hidden self-center md:inline"
    />
    <table className="grow self-stretch dark:border-black md:self-start">
      <tbody>
        {sortBy(
          Object.entries(card.stats),
          ([, stats]) => -stats.gameCount
        ).map(([deck, stats]) => {
          const deckColors = DECK_COLORS[deck as Deck];
          const winrate = formatPercentage(stats.winrate);
          return (
            <tr key={deck}>
              <th className="p-2 w-24 text-xl bg-neutral-100 dark:bg-neutral-800">
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
              <td className="py-2 px-4">
                <div className="flex">
                  <div
                    className={clsx(
                      "py-3 pl-4 w-16 text-2xl font-bold dark:text-black",
                      GRADE_BG_COLORS[stats.grade]
                    )}
                  >
                    {stats.grade}
                  </div>
                  <div
                    className={clsx(
                      "flex grow justify-center items-center border",
                      GRADE_BORDER_COLORS[stats.grade]
                    )}
                  >
                    <div className="font-mono text-xl">{winrate}</div>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <table className="grow self-stretch border dark:border-black md:self-start">
      <tbody>
        <StatsRow label="Average last seen at">
          {card.overallStats.lastSeenAt.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </StatsRow>
        <StatsRow label="Average taken at">
          {card.overallStats.takenAt.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </StatsRow>
        <StatsRow
          label="Number of games played"
          className="border-t dark:border-black"
        >
          {card.stats[Deck.ALL]!.gameCount.toLocaleString()}
        </StatsRow>
        <StatsRow label="Number of games drawn">
          {card.overallStats.drawnCount.toLocaleString()}
        </StatsRow>
        <StatsRow
          label="Games played win rate"
          className="border-t dark:border-black"
        >
          {formatPercentage(card.overallStats.playedWinrate)}
        </StatsRow>
        <StatsRow label="Opening hand win rate">
          {formatPercentage(card.overallStats.openingHandWinrate)}
        </StatsRow>
        <StatsRow label="Games drawn win rate">
          {formatPercentage(card.overallStats.drawnWinrate)}
        </StatsRow>
        <StatsRow label="Games in hand win rate">
          {formatPercentage(card.stats[Deck.ALL]!.winrate)}
        </StatsRow>
        <StatsRow label="Games not drawn win rate">
          {formatPercentage(card.overallStats.notDrawnWinrate)}
        </StatsRow>
        <StatsRow label="Improvement when drawn">
          {formatPercentageDifference(
            card.stats[Deck.ALL]!.winrate - card.overallStats.notDrawnWinrate
          )}
        </StatsRow>
      </tbody>
    </table>
  </div>
);

export default CardDetail;

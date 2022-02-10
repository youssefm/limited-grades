import clsx from "clsx";
import { round, sortBy } from "lodash";
import { FC } from "react";

import Modal from "components/common/Modal";
import {
  COLUMN_ICONS,
  DECK_COLORS,
  GRADE_BG_COLORS,
  GRADE_BORDER_COLORS,
} from "lib/constants";
import { Card, Deck } from "lib/types";
import { formatPercentage, formatPercentageDifference } from "lib/util";

interface Props {
  card: Card | undefined;
  onClose: () => void;
}

const CardDetailModal: FC<Props> = ({ card, onClose }) => {
  if (!card) {
    return null;
  }

  return (
    <Modal title={card.name} onClose={onClose} size="lg">
      <div className="flex flex-col gap-6 md:flex-row">
        <img
          src={card.cardUrl}
          alt={card.name}
          width="240"
          height="340"
          className="hidden self-center md:inline"
        />
        <table className="grow self-stretch dark:border-black md:self-start">
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
                          className={clsx(
                            COLUMN_ICONS[column],
                            "mr-1 last:mr-0"
                          )}
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
        </table>
        <table className="grow self-stretch border dark:border-black md:self-start">
          <tr>
            <td className="py-2 pl-4 text-left">Average last seen at</td>
            <td className="pr-4 text-right">
              {card.overallStats.lastSeenAt.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Average taken at</td>
            <td className="pr-4 text-right">
              {card.overallStats.takenAt.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
          <tr className="border-t dark:border-black">
            <td className="py-2 pl-4 text-left">Number of games played</td>
            <td className="pr-4 text-right">
              {card.stats[Deck.ALL]!.gameCount.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Number of games drawn</td>
            <td className="pr-4 text-right">
              {card.overallStats.drawnCount.toLocaleString()}
            </td>
          </tr>
          <tr className="border-t dark:border-black">
            <td className="py-2 pl-4 text-left">Games played win rate</td>
            <td className="pr-4 text-right">
              {formatPercentage(card.overallStats.playedWinrate)}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Opening hand win rate</td>
            <td className="pr-4 text-right">
              {formatPercentage(card.overallStats.openingHandWinrate)}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Games drawn win rate</td>
            <td className="pr-4 text-right">
              {formatPercentage(card.overallStats.drawnWinrate)}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Games in hand win rate</td>
            <td className="pr-4 text-right">
              {formatPercentage(card.stats[Deck.ALL]!.winrate)}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Games not drawn win rate</td>
            <td className="pr-4 text-right">
              {formatPercentage(card.overallStats.notDrawnWinrate)}
            </td>
          </tr>
          <tr>
            <td className="py-2 pl-4 text-left">Improvement when drawn</td>
            <td className="pr-4 text-right">
              {formatPercentageDifference(
                card.stats[Deck.ALL]!.winrate -
                  card.overallStats.notDrawnWinrate
              )}
            </td>
          </tr>
        </table>
      </div>
    </Modal>
  );
};

export default CardDetailModal;

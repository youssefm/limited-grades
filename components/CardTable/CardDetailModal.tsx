import clsx from "clsx";
import { sortBy } from "lodash";
import { FC } from "react";

import Modal from "components/common/Modal";
import {
  COLUMN_ICONS,
  DECK_COLORS,
  GRADE_BG_COLORS,
  GRADE_BORDER_COLORS,
} from "lib/constants";
import { Card, Deck } from "lib/types";

interface Props {
  card: Card | undefined;
  onClose: () => void;
}

const CardDetailModal: FC<Props> = ({ card, onClose }) => {
  if (!card) {
    return null;
  }

  return (
    <Modal title={card.name} onClose={onClose}>
      <div className="flex gap-6">
        <img
          src={card.cardUrl}
          alt={card.name}
          width="240"
          height="340"
          className="hidden self-center sm:inline"
        />
        <table className="grow self-start dark:border-black">
          <tbody>
            {sortBy(
              Object.entries(card.stats),
              ([, stats]) => -stats.gameCount
            ).map(([deck, stats]) => {
              const deckColors = DECK_COLORS[deck as Deck];
              const winrate = Number(stats.winrate).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 1,
              });
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
                              "mr-0.5 last:mr-0"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </th>
                  <td className="py-1 px-4">
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
      </div>
    </Modal>
  );
};

export default CardDetailModal;

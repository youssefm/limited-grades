import { sortBy } from "lodash";

import { COLUMN_ICONS, DECK_COLORS, DECK_LABELS } from "lib/constants";
import { Card, Deck } from "lib/types";
import { Dialog } from "@headlessui/react";

interface Props {
  card: Card | undefined;
  handleClose: () => void;
}

const CardDetailModal = (props: Props) => {
  const { card, handleClose } = props;

  if (!card) {
    return null;
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      className="fixed inset-0 flex justify-center items-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-10" />
      <div className="bg-white rounded-lg shadow-xl z-20 sm:max-w-3xl sm:w-full">
        <div>
          <Dialog.Title className="p-4 border-b-[1px] flex w-full">
            <span className="flex-grow text-2xl font-medium">{card.name}</span>
            <svg
              className="w-6 h-6 self-center hover:text-zinc-500 hover:cursor-pointer"
              stroke="currentColor"
              onClick={handleClose}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </Dialog.Title>
          <div className="p-4 sm:flex gap-6">
            <img
              src={card.cardUrl}
              alt={card.name}
              width="240"
              height="340"
              className="sm:self-center"
            />
            <table className="sm:flex-grow sm:self-start">
              <thead>
                <tr className="border-b-2 border-zinc-800">
                  <th className="p-2"></th>
                  <th className="p-2 text-left">Win Rate</th>
                  <th className="p-2 text-left">Grade</th>
                </tr>
              </thead>
              <tbody>
                {sortBy(
                  Object.entries(card.stats),
                  ([deck, stats]) => -stats.gameCount
                ).map(([deck, stats]) => {
                  const deckColors = DECK_COLORS[deck as Deck];
                  return (
                    <tr key={deck} className="border-b-[1px] border-zinc-200">
                      <th className="p-2 text-left">
                        {deckColors.length > 0 ? (
                          <>
                            {deckColors.map((column) => (
                              <i
                                key={column}
                                className={COLUMN_ICONS[column]}
                              />
                            ))}
                          </>
                        ) : (
                          DECK_LABELS[deck as Deck]
                        )}
                      </th>
                      <td className="p-2">
                        {Number(stats.winrate).toLocaleString(undefined, {
                          style: "percent",
                          minimumFractionDigits: 1,
                        })}
                      </td>
                      <td className="p-2">{stats.grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CardDetailModal;

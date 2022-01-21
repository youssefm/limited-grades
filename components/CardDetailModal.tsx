import { sortBy } from "lodash";
import { FC } from "react";

import Modal from "components/Modal";
import { COLUMN_ICONS, DECK_COLORS, DECK_LABELS } from "lib/constants";
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
          className="self-center hidden sm:inline"
        />
        <table className="flex-grow self-start">
          <thead>
            <tr className="border-b-2 border-zinc-800">
              <th className="p-2" />
              <th className="p-2 text-left">Win Rate</th>
              <th className="p-2 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {sortBy(
              Object.entries(card.stats),
              ([, stats]) => -stats.gameCount
            ).map(([deck, stats]) => {
              const deckColors = DECK_COLORS[deck as Deck];
              return (
                <tr key={deck} className="border-b-[1px] border-zinc-200">
                  <th className="p-2 text-left">
                    {deckColors.length > 0 ? (
                      <>
                        {deckColors.map((column) => (
                          <i key={column} className={COLUMN_ICONS[column]} />
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
    </Modal>
  );
};

export default CardDetailModal;

import { FC, useState } from "react";

import { ALL_COLUMNS, ALL_GRADES, COLUMN_ICONS } from "lib/constants";
import { CardTableDictionary } from "lib/table";
import { Card } from "lib/types";

import CardDetailModal from "./CardDetailModal";
import CardView from "./CardView";

interface Props {
  cardDictionary: CardTableDictionary;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, showSkeletons }) => {
  const [modalCard, setModalCard] = useState<Card>();

  return (
    <>
      <div className="overflow-x-auto lg:overflow-x-visible">
        <table className="w-full border-separate lg:table-fixed border-spacing-0">
          <thead>
            <tr className="lg:sticky lg:top-0">
              <th className="w-16 h-11 bg-zinc-200 border-b-2 border-zinc-800" />
              {ALL_COLUMNS.map((column) => (
                <th
                  key={column}
                  className="h-11 bg-zinc-200 border-b-2 border-zinc-800"
                >
                  <i className={COLUMN_ICONS[column]} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_GRADES.map((grade) => (
              <tr key={grade}>
                <th className="w-16 text-xl text-left bg-zinc-200 border-b border-zinc-300 lg:pl-4">
                  {grade}
                </th>
                {ALL_COLUMNS.map((column) => (
                  <td
                    key={column}
                    className="py-2 px-1 align-top bg-zinc-100 border-b border-zinc-200"
                  >
                    {cardDictionary
                      .get(column, grade)
                      .map((card) =>
                        showSkeletons ? (
                          <div
                            key={card.cardUrl}
                            className="mb-1 last:mb-0 h-6 bg-zinc-200 animate-pulse"
                          />
                        ) : (
                          <CardView
                            key={card.cardUrl}
                            card={card}
                            onClick={() => setModalCard(card)}
                          />
                        )
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CardDetailModal
        card={modalCard}
        onClose={() => setModalCard(undefined)}
      />
    </>
  );
};

export default CardTable;

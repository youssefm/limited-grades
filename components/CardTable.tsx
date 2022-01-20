import { FC, useState } from "react";

import CardDetailModal from "components/CardDetailModal";
import CardView from "components/CardView";
import { COLUMN_ICONS } from "lib/constants";
import { Card, Column, Grade } from "lib/types";
import { CardTableDictionary } from "lib/table";

interface Props {
  cardDictionary: CardTableDictionary;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, showSkeletons }) => {
  const [modalCard, setModalCard] = useState<Card>();

  return (
    <>
      <table className="w-full lg:table-fixed">
        <thead>
          <tr className="border-b-2 border-zinc-800">
            <th className="w-16 h-11 bg-zinc-200"></th>
            {Object.values(Column).map((column) => (
              <th key={column} className="h-11 bg-zinc-200">
                <i className={COLUMN_ICONS[column]}></i>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(Grade).map((grade) => (
            <tr key={grade} className="border-b-[1px] border-zinc-200">
              <th className="w-16 bg-zinc-200 text-xl text-left lg:pl-4">
                {grade}
              </th>
              {Object.values(Column).map((column) => (
                <td key={column} className="px-1 py-2 align-top bg-zinc-100">
                  {cardDictionary
                    .get(column, grade)
                    .map((card) =>
                      showSkeletons ? (
                        <div
                          key={card.cardUrl}
                          className="h-8 bg-zinc-200 mb-1 last:mb-0 animate-pulse"
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

      <CardDetailModal
        card={modalCard}
        onClose={() => setModalCard(undefined)}
      />
    </>
  );
};

export default CardTable;

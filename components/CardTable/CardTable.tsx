import clsx from "clsx";
import { FC, useState } from "react";

import {
  ALL_COLUMNS,
  ALL_GRADES,
  COLUMN_ICONS,
  GRADE_BORDER_COLORS,
} from "lib/constants";
import { TRANSITION_CLASSES } from "lib/styles";
import { CardTableDictionary } from "lib/table";
import { Card } from "lib/types";

import CardDetailModal from "./CardDetailModal";
import CardView from "./CardView";

const HEADER_BG_CLASSES = "bg-neutral-200 dark:bg-neutral-600";
const HEADER_BORDER_CLASSES = "border-b-2 border-neutral-900";
const BODY_BORDER_CLASSES = "border-b-2 border-white dark:border-neutral-900";

interface Props {
  cardDictionary: CardTableDictionary;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, showSkeletons }) => {
  const [modalCard, setModalCard] = useState<Card>();

  return (
    <>
      <div className="overflow-x-auto lg:overflow-x-visible">
        <table className="w-full h-full border-separate lg:table-fixed border-spacing-0">
          <thead>
            <tr className="text-lg lg:sticky lg:top-0">
              <th
                className={clsx(
                  "w-16",
                  HEADER_BG_CLASSES,
                  HEADER_BORDER_CLASSES,
                  TRANSITION_CLASSES
                )}
              />
              {ALL_COLUMNS.map((column) => (
                <th
                  key={column}
                  className={clsx(
                    HEADER_BG_CLASSES,
                    HEADER_BORDER_CLASSES,
                    TRANSITION_CLASSES
                  )}
                >
                  <i className={clsx("my-2", COLUMN_ICONS[column])} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_GRADES.map((grade) => (
              <tr key={grade}>
                <th
                  className={clsx(
                    "p-0 w-16",
                    HEADER_BG_CLASSES,
                    BODY_BORDER_CLASSES,
                    TRANSITION_CLASSES
                  )}
                >
                  <div
                    className={clsx(
                      "flex items-center pl-1 h-full text-xl border-l-4 lg:pl-4",
                      GRADE_BORDER_COLORS[grade]
                    )}
                  >
                    {grade}
                  </div>
                </th>
                {ALL_COLUMNS.map((column) => (
                  <td
                    key={column}
                    className={clsx(
                      "py-2 px-1 align-top bg-neutral-100 dark:bg-neutral-800",
                      BODY_BORDER_CLASSES,
                      TRANSITION_CLASSES
                    )}
                  >
                    {cardDictionary
                      .get(column, grade)
                      .map((card) =>
                        showSkeletons ? (
                          <div
                            key={card.cardUrl}
                            className="mb-1 last:mb-0 h-6 bg-neutral-200 dark:bg-neutral-700 animate-pulse"
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

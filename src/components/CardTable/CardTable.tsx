import clsx from "clsx";
import { FC, useState } from "react";

import { ALL_COLUMNS, ALL_GRADES } from "lib/constants";
import {
  COLUMN_ICONS,
  GRADE_BORDER_COLORS,
  TRANSITION_CLASSES,
} from "lib/styles";
import { CardTableDictionary } from "lib/table";
import { Card, MagicSet } from "lib/types";

import CardDetailModal from "./CardDetailModal";
import CardView from "./CardView";

const HEADER_BG_CLASSES = "bg-neutral-200 dark:bg-neutral-600";
const HEADER_BORDER_CLASSES = "border-b-2 border-neutral-900";
const BODY_BORDER_CLASSES = "border-b-2 border-white dark:border-neutral-900";

interface Props {
  cardDictionary: CardTableDictionary;
  set: MagicSet;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, set, showSkeletons }) => {
  const [modalCard, setModalCard] = useState<Card>();

  return (
    <>
      <div className="hidden lg:block">
        <table className="w-full h-full border-separate table-fixed border-spacing-0">
          <thead>
            <tr className="sticky top-0 text-lg">
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

      <div className="lg:hidden">
        {ALL_GRADES.map((grade) => {
          let hasCards = false;
          for (const column of ALL_COLUMNS) {
            if (cardDictionary.get(column, grade).length > 0) {
              hasCards = true;
              break;
            }
          }
          if (!hasCards) {
            return null;
          }
          return (
            <div key={grade}>
              <div className="py-2 text-xl font-bold text-center">{grade}</div>
              <table className="w-full h-full">
                <tbody>
                  {ALL_COLUMNS.map((column) => {
                    const cellCards = cardDictionary.get(column, grade);
                    if (cellCards.length === 0) {
                      return null;
                    }
                    return (
                      <tr key={column}>
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
                              "flex justify-center items-center h-full border-l-4",
                              GRADE_BORDER_COLORS[grade]
                            )}
                          >
                            <i className={clsx("my-2", COLUMN_ICONS[column])} />
                          </div>
                        </th>
                        <td
                          className={clsx(
                            "p-2 bg-neutral-100 dark:bg-neutral-800",
                            BODY_BORDER_CLASSES,
                            TRANSITION_CLASSES
                          )}
                        >
                          {cellCards.map((card) =>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <CardDetailModal
        card={modalCard}
        set={set}
        onClose={() => setModalCard(undefined)}
      />
    </>
  );
};

export default CardTable;

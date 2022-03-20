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

interface Props {
  cardDictionary: CardTableDictionary;
  set: MagicSet;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, set, showSkeletons }) => {
  const [modalCard, setModalCard] = useState<Card>();

  return (
    <>
      <div
        className={clsx(
          "hidden sticky top-0 text-lg border-b-2 border-neutral-900 lg:flex",
          HEADER_BG_CLASSES,
          TRANSITION_CLASSES
        )}
      >
        <div className="shrink-0 w-16" />
        {ALL_COLUMNS.map((column) => (
          <div key={column} className="basis-full p-[1px] text-center">
            <i className={clsx("my-2", COLUMN_ICONS[column])} />
          </div>
        ))}
      </div>
      {ALL_GRADES.map((grade) => {
        let hasCards = false;
        for (const column of ALL_COLUMNS) {
          if (cardDictionary.get(column, grade).length > 0) {
            hasCards = true;
            break;
          }
        }
        return (
          <div
            key={grade}
            className={clsx("lg:mb-0.5 lg:last:mb-0", {
              "hidden lg:block": !hasCards,
            })}
          >
            <div className="py-2 text-xl font-bold text-center lg:hidden">
              {grade}
            </div>
            <div className="flex flex-col gap-0.5 lg:flex-row lg:gap-0">
              <div
                className={clsx(
                  "hidden shrink-0 w-16 lg:block",
                  HEADER_BG_CLASSES,
                  TRANSITION_CLASSES
                )}
              >
                <div
                  className={clsx(
                    "flex items-center pl-4 h-full text-xl font-bold border-l-4",
                    GRADE_BORDER_COLORS[grade]
                  )}
                >
                  {grade}
                </div>
              </div>
              {ALL_COLUMNS.map((column) => {
                const cellCards = cardDictionary.get(column, grade);
                return (
                  <div
                    key={column}
                    className={clsx("flex lg:basis-full", {
                      "hidden lg:flex": cellCards.length === 0,
                    })}
                  >
                    <div
                      className={clsx(
                        "shrink-0 w-16 lg:hidden",
                        HEADER_BG_CLASSES,
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
                    </div>
                    <div
                      className={clsx(
                        "grow p-2 bg-neutral-100 dark:bg-neutral-800 lg:px-1",
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <CardDetailModal
        card={modalCard}
        set={set}
        onClose={() => setModalCard(undefined)}
      />
    </>
  );
};

export default CardTable;

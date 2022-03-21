import clsx from "clsx";
import { FC, useState } from "react";

import { ALL_COLUMNS, ALL_GRADES } from "lib/constants";
import {
  COLUMN_ICONS,
  GRADE_BORDER_COLORS,
  TRANSITION_CLASSES,
} from "lib/styles";
import { CardTableDictionary } from "lib/table";
import { Card, Grade, MagicSet } from "lib/types";
import { matchesMedia } from "lib/util";

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

  const enableHover = matchesMedia("(hover: hover)");
  return (
    <>
      <div
        className={clsx(
          "hidden sticky top-0 text-lg border-b-2 border-neutral-900 lg:grid lg:grid-cols-[4rem_repeat(7,_1fr)]",
          HEADER_BG_CLASSES,
          TRANSITION_CLASSES
        )}
      >
        <div />
        {ALL_COLUMNS.map((column) => (
          <div key={column} className="p-[1px] text-center">
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
            className={clsx({
              "hidden lg:block": !hasCards,
              "lg:mb-0.5": grade !== Grade.F,
            })}
          >
            <div className="py-2 text-xl font-bold text-center lg:hidden">
              {grade}
            </div>
            <div className="grid grid-cols-[1fr] gap-0.5 lg:grid-cols-[4rem_repeat(7,_1fr)] lg:gap-0">
              <div
                className={clsx(
                  "hidden items-center pl-4 text-xl font-bold border-l-4 lg:flex",
                  HEADER_BG_CLASSES,
                  GRADE_BORDER_COLORS[grade],
                  TRANSITION_CLASSES
                )}
              >
                {grade}
              </div>
              {ALL_COLUMNS.map((column) => {
                const cellCards = cardDictionary.get(column, grade);
                return (
                  <div
                    key={column}
                    className={clsx("items-stretch", {
                      "hidden lg:flex": cellCards.length === 0,
                      flex: cellCards.length > 0,
                    })}
                  >
                    <div
                      className={clsx(
                        "flex shrink-0 justify-center items-center w-16 border-l-4 lg:hidden",
                        HEADER_BG_CLASSES,
                        GRADE_BORDER_COLORS[grade],
                        TRANSITION_CLASSES
                      )}
                    >
                      <i className={clsx("my-2", COLUMN_ICONS[column])} />
                    </div>
                    <div
                      className={clsx(
                        "grow p-2 bg-neutral-100 dark:bg-neutral-800 lg:px-1",
                        TRANSITION_CLASSES
                      )}
                    >
                      {cellCards.map((card) => {
                        if (showSkeletons) {
                          return (
                            <div
                              key={card.cardUrl}
                              className="mb-1 last:mb-0 h-6 bg-neutral-200 dark:bg-neutral-700 animate-pulse"
                            />
                          );
                        }

                        return (
                          <CardView
                            key={card.cardUrl}
                            card={card}
                            onClick={() => setModalCard(card)}
                            enableHover={enableHover}
                          />
                        );
                      })}
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

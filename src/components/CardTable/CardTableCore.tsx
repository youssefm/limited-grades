import clsx from "clsx";
import { FC, memo } from "react";

import Center from "components/common/Center";
import ColorIcon from "components/common/ColorIcon";
import CardTableDictionary from "lib/CardTableDictionary";
import { ALL_COLORS, ALL_GRADES } from "lib/constants";
import { GRADE_BORDER_COLORS, TRANSITION_CLASSES } from "lib/styles";
import { Card, Grade } from "lib/types";
import { matchesMedia } from "lib/util";

import CardView from "./CardView";

const HEADER_BG_CLASSES = "bg-neutral-200 dark:bg-neutral-600";

interface Props {
  cardDictionary: CardTableDictionary;
  showSkeletons: boolean;
  onClickCard: (card: Card) => void;
}

const CardTableCore: FC<Props> = ({
  cardDictionary,
  showSkeletons,
  onClickCard,
}) => {
  const enableCardPreview = matchesMedia("(hover: hover)");
  return (
    <>
      <div
        className={clsx(
          "sticky top-0 hidden border-b-2 border-neutral-900 text-lg lg:grid lg:grid-cols-[4rem_repeat(7,_1fr)]",
          HEADER_BG_CLASSES,
          TRANSITION_CLASSES
        )}
      >
        <div />
        {ALL_COLORS.map((color) => (
          <div key={color} className="p-px text-center">
            <ColorIcon color={color} className="my-2" />
          </div>
        ))}
      </div>
      {ALL_GRADES.map((grade) => {
        let hasCards = false;
        for (const color of ALL_COLORS) {
          if (cardDictionary.get(color, grade).length > 0) {
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
            <div className="py-2 text-center text-xl font-bold lg:hidden">
              {grade}
            </div>
            <div className="grid grid-cols-[1fr] gap-0.5 lg:grid-cols-[4rem_repeat(7,_1fr)] lg:gap-0">
              <div
                className={clsx(
                  "hidden items-center border-l-4 pl-4 text-xl font-bold lg:flex",
                  HEADER_BG_CLASSES,
                  GRADE_BORDER_COLORS[grade],
                  TRANSITION_CLASSES
                )}
              >
                {grade}
              </div>
              {ALL_COLORS.map((color) => {
                const cellCards = cardDictionary.get(color, grade);
                return (
                  <div
                    key={color}
                    className={clsx("lg:block", {
                      flex: cellCards.length > 0,
                      hidden: cellCards.length === 0,
                    })}
                  >
                    <Center
                      className={clsx(
                        "w-16 shrink-0 border-l-4 lg:hidden",
                        HEADER_BG_CLASSES,
                        GRADE_BORDER_COLORS[grade],
                        TRANSITION_CLASSES
                      )}
                    >
                      <ColorIcon color={color} className="my-2" />
                    </Center>
                    <div
                      className={clsx(
                        "grow bg-neutral-100 p-2 dark:bg-neutral-800 lg:h-full lg:px-1",
                        TRANSITION_CLASSES
                      )}
                    >
                      {cellCards.map((card) => {
                        if (showSkeletons) {
                          return (
                            <div
                              key={card.cardUrl}
                              className="mb-1 h-6 animate-pulse bg-neutral-200 last:mb-0 dark:bg-neutral-700"
                            />
                          );
                        }

                        return (
                          <CardView
                            key={card.cardUrl}
                            card={card}
                            onClick={() => onClickCard(card)}
                            enableCardPreview={enableCardPreview}
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
    </>
  );
};

export default memo(CardTableCore);

import { FC, useState } from "react";

import CardTableDictionary from "lib/CardTableDictionary";
import MagicSet from "lib/MagicSet";
import { Card } from "lib/types";

import CardDetailModal from "./CardDetailModal";
import CardTableCore from "./CardTableCore";

interface Props {
  cardDictionary: CardTableDictionary;
  set: MagicSet;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, set, showSkeletons }) => {
  const [modalCard, setModalCard] = useState<Card>();

  return (
    <>
      <CardTableCore
        cardDictionary={cardDictionary}
        showSkeletons={showSkeletons}
        onClickCard={setModalCard}
      />
      {modalCard && (
        <CardDetailModal
          card={modalCard}
          set={set}
          onClose={() => setModalCard(undefined)}
        />
      )}
    </>
  );
};

export default CardTable;

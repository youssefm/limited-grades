import { FC, useState } from "react";

import CardTableDictionary from "lib/CardTableDictionary";
import { Card } from "lib/types";

import CardDetailModal from "./CardDetailModal";
import CardTableCore from "./CardTableCore";

interface Props {
  cardDictionary: CardTableDictionary;
  showSkeletons: boolean;
}

const CardTable: FC<Props> = ({ cardDictionary, showSkeletons }) => {
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
          onClose={() => setModalCard(undefined)}
        />
      )}
    </>
  );
};

export default CardTable;

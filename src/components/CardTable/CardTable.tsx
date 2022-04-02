import { FC, useState } from "react";

import CardDetail from "components/common/CardDetail";
import Modal from "components/common/Modal";
import { CardTableDictionary } from "lib/table";
import { Card, MagicSet } from "lib/types";

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
        <Modal
          title={modalCard.name}
          onClose={() => setModalCard(undefined)}
          className="w-full lg:w-auto"
        >
          <CardDetail card={modalCard} set={set} />
        </Modal>
      )}
    </>
  );
};

export default CardTable;

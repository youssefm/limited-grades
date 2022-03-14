import { FC } from "react";

import CardDetail from "components/CardTable/CardDetail";
import Modal from "components/common/Modal";
import { Card } from "lib/types";

interface Props {
  card: Card | undefined;
  onClose: () => void;
}

const CardDetailModal: FC<Props> = ({ card, onClose }) => {
  if (!card) {
    return null;
  }

  return (
    <Modal title={card.name} onClose={onClose} size="lg">
      <CardDetail card={card} />
    </Modal>
  );
};

export default CardDetailModal;

import { FC } from "react";

import CardDetail from "components/common/CardDetail";
import Modal from "components/common/Modal";
import { Card } from "lib/types";

interface Props {
  card: Card;
  onClose: () => void;
}

const CardDetailModal: FC<Props> = ({ card, onClose }) => (
  <Modal title={card.name} onClose={onClose} className="size-full lg:size-fit">
    <CardDetail card={card} />
  </Modal>
);

export default CardDetailModal;

import { FC } from "react";

import CardDetail from "components/common/CardDetail";
import Modal from "components/common/Modal";
import { Card, MagicSet } from "lib/types";

interface Props {
  card: Card;
  set: MagicSet;
  onClose: () => void;
}

const CardDetailModal: FC<Props> = ({ card, set, onClose }) => (
  <Modal title={card.name} onClose={onClose} className="w-full lg:w-auto">
    <CardDetail card={card} set={set} />
  </Modal>
);

export default CardDetailModal;

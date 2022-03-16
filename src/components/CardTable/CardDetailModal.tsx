import { FC } from "react";
import { ImInfo } from "react-icons/im";

import CardDetail from "components/CardTable/CardDetail";
import Banner from "components/common/Banner";
import Modal from "components/common/Modal";
import { isSetUnderEmbargo } from "lib/sets";
import { Card, MagicSet } from "lib/types";

interface Props {
  card: Card | undefined;
  set: MagicSet;
  onClose: () => void;
}

const CardDetailModal: FC<Props> = ({ card, set, onClose }) => {
  if (!card) {
    return null;
  }

  const underEmbargo = isSetUnderEmbargo(set);
  const size = underEmbargo ? "sm" : "lg";

  return (
    <Modal title={card.name} onClose={onClose} size={size}>
      {underEmbargo && (
        <Banner dismissable={false}>
          <ImInfo className="inline relative bottom-0.5 mr-2" />
          17Lands stats are not yet available for this set
        </Banner>
      )}
      <CardDetail card={card} showStats={!underEmbargo} />
    </Modal>
  );
};

export default CardDetailModal;

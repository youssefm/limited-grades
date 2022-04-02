import { FC } from "react";
import { ImInfo } from "react-icons/im";

import Banner from "components/common/Banner";
import CardDetail from "components/common/CardDetail";
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

  return (
    <Modal title={card.name} onClose={onClose} className="w-full lg:w-auto">
      {underEmbargo && (
        <Banner dismissable={false}>
          <ImInfo className="inline relative bottom-0.5 mr-2" />
          Detailed 17Lands stats are not yet available for this set
        </Banner>
      )}
      <CardDetail card={card} showStats={!underEmbargo} />
    </Modal>
  );
};

export default CardDetailModal;

import { sortBy } from "lodash";
import { FC } from "react";

import Modal from "components/Modal";
import { COLUMN_ICONS } from "lib/constants";
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
    <Modal title={card.name} onClose={onClose}>
      <div className="sm:flex sm:gap-6">
        <img
          src={card.cardUrl}
          alt={card.name}
          width="240"
          height="340"
          className="sm:self-center"
        />
        <table className="sm:flex-grow sm:self-start">
          <thead>
            <tr className="border-b-2 border-zinc-800">
              <th className="p-2"></th>
              <th className="p-2 text-left">Win Rate</th>
              <th className="p-2 text-left">Grade</th>
            </tr>
          </thead>
        </table>
      </div>
    </Modal>
  );
};

export default CardDetailModal;

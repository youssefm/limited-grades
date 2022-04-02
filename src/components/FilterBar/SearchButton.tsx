import clsx from "clsx";
import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card, MagicSet } from "lib/types";

import SearchModal from "./SearchModal";

interface Props {
  cards: Card[];
  set: MagicSet;
}

const SetSelector: FC<Props> = ({ cards, set }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={clsx(
          "p-2 text-2xl text-center",
          HOVER_CLASSES,
          TRANSITION_CLASSES
        )}
        type="button"
        aria-label="Search"
      >
        <FaSearch />
      </button>
      {isModalOpen && (
        <SearchModal
          cards={cards}
          set={set}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default SetSelector;

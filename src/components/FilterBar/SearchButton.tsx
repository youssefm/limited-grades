import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { IS_UMAMI_ENABLED } from "lib/analytics";
import { TRANSITION_CLASSES } from "lib/styles";
import { Card, MagicSet } from "lib/types";

import SearchModal from "./SearchModal";

interface Props {
  cards: Card[];
  set: MagicSet;
}

const SearchButton: FC<Props> = ({ cards, set }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      // CTRL + F or CMD + F combo
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        setModalOpen(true);
        if (IS_UMAMI_ENABLED) {
          setTimeout(() => umami?.("search-keyboard-shortcut"));
        }
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);
    return () =>
      document.removeEventListener("keydown", handleKeyboardShortcut);
  }, []);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={clsx(
          "py-1 px-6 w-full h-full hover:text-white rounded lg:text-2xl lg:rounded-lg",
          "bg-white hover:bg-blue-500 dark:bg-neutral-700 dark:hover:bg-amber-600",
          "border border-neutral-300 dark:border-black umami--click--search-button",
          TRANSITION_CLASSES
        )}
        type="button"
        aria-label="Search"
      >
        <FaSearch className="inline-block relative bottom-0.5 mr-1.5 lg:block lg:static lg:mr-0" />
        <span className="lg:hidden">Search</span>
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

export default SearchButton;

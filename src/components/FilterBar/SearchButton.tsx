import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { trackEvent } from "lib/analytics";
import MagicSet from "lib/MagicSet";
import { TRANSITION_CLASSES } from "lib/styles";
import { Card } from "lib/types";

import SearchModal from "./SearchModal";

interface Props {
  cards: Card[];
  set: MagicSet;
}

const SearchButton: FC<Props> = ({ cards, set }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      // CTRL + K or CMD + K combo
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setModalOpen(true);
        trackEvent("search modal opened with keyboard shortcut");
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);
    return () =>
      document.removeEventListener("keydown", handleKeyboardShortcut);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setModalOpen(true);
          trackEvent("search modal button clicked");
        }}
        className={clsx(
          "py-1 px-6 w-full h-full hover:text-white rounded lg:text-2xl lg:rounded-lg",
          "bg-white hover:bg-blue-500 dark:bg-neutral-700 dark:hover:bg-amber-600",
          "border border-neutral-300 dark:border-black",
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

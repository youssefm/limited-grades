import clsx from "clsx";
import { FC, useCallback, useMemo, useRef, useState } from "react";

import CardDetail from "components/common/CardDetail";
import ColorIcon from "components/common/ColorIcon";
import Modal from "components/common/Modal";
import SearchIndex from "lib/search";
import { isSetUnderEmbargo } from "lib/sets";
import { Card, MagicSet } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  cards: Card[];
  set: MagicSet;
  onClose: () => void;
}

const SearchModal: FC<Props> = ({ cards, set, onClose }) => {
  const [options, setOptions] = useState<Card[]>(cards);
  const [selectedCard, setSelectedCard] = useState<Card>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchIndex = useMemo(() => new SearchIndex(cards, "name"), [cards]);

  const underEmbargo = isSetUnderEmbargo(set);
  const getIcon = useCallback(
    (card: Card) => (
      <ColorIcon color={card.column} className="relative bottom-[-0.0625em]" />
    ),
    []
  );

  return (
    <Modal
      title="Search"
      onClose={onClose}
      initialFocus={inputRef}
      className="w-full h-full lg:w-auto lg:h-auto"
    >
      <IconSelect
        value={selectedCard}
        onChange={(selectedValue) => {
          if (selectedValue === undefined) {
            setOptions(cards);
          }
          setSelectedCard(selectedValue);
        }}
        options={options.slice(0, 6)}
        onInputChange={(newValue, actionMeta) => {
          if (actionMeta.action === "input-change") {
            const searchResults = searchIndex.search(newValue);
            setOptions(searchResults.map((result) => result.item));
          }
        }}
        filterOption={() => true}
        getLabel={(card) => (card ? card.name : "")}
        getIcon={getIcon}
        placeholder="Enter a card name"
        className="mb-4"
        selectRef={(select) => {
          inputRef.current = select ? select.inputRef : null;
        }}
        isClearable
        autoFocus
      />
      {!selectedCard && (
        <div
          className={clsx({
            "lg:w-[912.22px] lg:h-[440px]": !underEmbargo,
            "lg:w-[522px] lg:h-[484px]": underEmbargo,
          })}
        />
      )}
      {selectedCard && (
        <CardDetail card={selectedCard} set={set} showLoadingState />
      )}
    </Modal>
  );
};

export default SearchModal;

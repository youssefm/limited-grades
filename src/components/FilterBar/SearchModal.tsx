import clsx from "clsx";
import { FC, useCallback, useMemo, useRef, useState } from "react";

import CardDetail from "components/common/CardDetail";
import ColorIcon from "components/common/ColorIcon";
import Modal from "components/common/Modal";
import MagicSet from "lib/MagicSet";
import SearchIndex, { Match } from "lib/SearchIndex";
import { Card } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  cards: Card[];
  set: MagicSet;
  onClose: () => void;
}

interface SearchOption {
  item: Card;
  match?: Match;
}

const SearchModal: FC<Props> = ({ cards, set, onClose }) => {
  const [options, setOptions] = useState<SearchOption[]>();
  const [selectedOption, setSelectedOption] = useState<SearchOption>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchIndex = useMemo(
    () => new SearchIndex(cards, (card) => card.name),
    [cards]
  );

  const underEmbargo = set.isUnderEmbargo();
  const getIcon = useCallback(
    (option: SearchOption) => (
      <ColorIcon
        color={option.item.color}
        className="relative bottom-[-0.0625em]"
      />
    ),
    []
  );

  const formatOptionText = useCallback((value: SearchOption, label: string) => {
    const { match } = value;
    if (match) {
      return (
        <>
          {match.startPosition > 0 && label.slice(0, match.startPosition)}
          <span className="font-bold underline">
            {label.slice(match.startPosition, match.endPosition)}
          </span>
          {match.endPosition < label.length && label.slice(match.endPosition)}
        </>
      );
    }
    return label;
  }, []);

  return (
    <Modal
      title="Search"
      onClose={onClose}
      initialFocus={inputRef}
      className="w-full h-full lg:w-auto lg:h-auto"
    >
      <IconSelect
        value={selectedOption}
        onChange={(selectedValue) => {
          setSelectedOption(selectedValue);
          setOptions(undefined);
        }}
        options={options ? options.slice(0, 6) : []}
        onInputChange={(newValue, actionMeta) => {
          if (actionMeta.action === "input-change") {
            if (newValue.length === 0) {
              setOptions(undefined);
              return;
            }
            const searchResults = searchIndex.search(newValue);
            setOptions(searchResults);
          }
        }}
        filterOption={() => true}
        getLabel={(option) => (option ? option.item.name : "")}
        getIcon={getIcon}
        formatOptionText={formatOptionText}
        placeholder="Enter a card name"
        noOptionsMessage={({ inputValue }) =>
          inputValue.length > 0 ? "No matching cards found" : null
        }
        className="mb-4"
        selectRef={(select) => {
          inputRef.current = select ? select.inputRef : null;
        }}
        isClearable
        autoFocus
      />
      {!selectedOption && (
        <div
          className={clsx("lg:h-[440px]", {
            "lg:w-[928.22px]": !underEmbargo,
            "lg:w-[538px]": underEmbargo,
          })}
        />
      )}
      {selectedOption && (
        <CardDetail card={selectedOption.item} set={set} showLoadingState />
      )}
    </Modal>
  );
};

export default SearchModal;

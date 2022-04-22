import clsx from "clsx";
import { FC, useCallback, useMemo, useRef, useState } from "react";

import CardDetail from "components/common/CardDetail";
import ColorIcon from "components/common/ColorIcon";
import Modal from "components/common/Modal";
import SearchIndex, { Match } from "lib/search";
import { isSetUnderEmbargo } from "lib/sets";
import { Card, MagicSet } from "lib/types";

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

  const searchIndex = useMemo(() => new SearchIndex(cards, "name"), [cards]);

  const underEmbargo = isSetUnderEmbargo(set);
  const getIcon = useCallback(
    (option: SearchOption) => (
      <ColorIcon
        color={option.item.column}
        className="relative bottom-[-0.0625em]"
      />
    ),
    []
  );

  const formatOptionText = useCallback(
    ({ match }: SearchOption, label: string) =>
      match ? (
        <>
          {match.startPosition > 0 && label.slice(0, match.startPosition)}
          <span className="font-bold underline">
            {label.slice(match.startPosition, match.endPosition)}
          </span>
          {match.endPosition < label.length && label.slice(match.endPosition)}
        </>
      ) : (
        label
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
        value={selectedOption}
        onChange={(selectedValue) => {
          if (selectedValue === undefined) {
            setOptions(undefined);
          }
          setSelectedOption(selectedValue);
        }}
        options={
          options
            ? options.slice(0, 6)
            : cards.slice(0, 6).map((card) => ({ item: card }))
        }
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
        className="mb-4"
        selectRef={(select) => {
          inputRef.current = select ? select.inputRef : null;
        }}
        isClearable
        autoFocus
      />
      {!selectedOption && (
        <div
          className={clsx({
            "lg:w-[912.22px] lg:h-[440px]": !underEmbargo,
            "lg:w-[522px] lg:h-[484px]": underEmbargo,
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

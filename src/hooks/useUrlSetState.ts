import { useCallback } from "react";

import { reverseLookup, setEquals } from "lib/util";

import useUrlState from "./useUrlState";

const useUrlSetState = <T extends string>(
  key: string,
  characterMap: Record<T, string>,
  defaultValue: Set<T>
): [Set<T>, (value: Set<T>) => void] => {
  const [urlState, setUrlState] = useUrlState(key);

  let value: Set<T>;
  if (urlState === undefined) {
    value = defaultValue;
  } else {
    value = new Set<T>();
    for (const urlCharacter of urlState) {
      const enumValue = reverseLookup(characterMap, urlCharacter);
      if (enumValue) {
        value.add(enumValue);
      }
    }
  }

  const setValue = useCallback(
    (newValue: Set<T>) =>
      setUrlState(
        setEquals(newValue, defaultValue)
          ? undefined
          : Array.from(newValue)
              .map((element) => characterMap[element])
              .join("")
      ),
    [setUrlState, characterMap, defaultValue]
  );

  return [value, setValue];
};

export default useUrlSetState;

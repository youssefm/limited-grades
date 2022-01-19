import { FC } from "react";

import FilterLabel from "components/FilterLabel";
import { MagicSet, Rarity } from "lib/types";

interface Props {
  set: MagicSet;
  values: Set<Rarity>;
  setValues: (rarities: Set<Rarity>) => void;
}

const RarityFilter: FC<Props> = (props) => {
  const { set, values, setValues } = props;

  return (
    <div>
      <FilterLabel>Rarity</FilterLabel>
      <div>
        {Object.values(Rarity).map((rarity) => (
          <label key={rarity}>
            <input
              type="checkbox"
              checked={values.has(rarity)}
              onChange={() => {
                const newValues = new Set(values);
                if (newValues.has(rarity)) {
                  newValues.delete(rarity);
                } else {
                  newValues.add(rarity);
                }
                setValues(newValues);
              }}
              className="peer hidden"
            ></input>
            <i
              title={values.has(rarity) ? `Hide ${rarity}s` : `Show ${rarity}s`}
              className={`ss ss-2x ss-fw ss-${set} ss-${rarity} cursor-pointer opacity-30 peer-checked:opacity-90`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RarityFilter;

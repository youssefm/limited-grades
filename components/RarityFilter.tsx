import { MagicSet, Rarity } from "lib/types";

// const SetIcon = styled.i`
//   cursor: pointer;
//   opacity: 90%;
// `;

// const HiddenInput = styled.input`
//   display: none;

//   :not(:checked) + i {
//     opacity: 30%;
//   }
// `;

interface Props {
  set: MagicSet;
  values: Set<Rarity>;
  setValues: (rarities: Set<Rarity>) => void;
}

const RarityFilter = (props: Props) => {
  const { set, values, setValues } = props;

  return (
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
          ></input>
          <i
            title={values.has(rarity) ? `Hide ${rarity}s` : `Show ${rarity}s`}
            className={`ss ss-2x ss-fw ss-${set} ss-${rarity}`}
          />
        </label>
      ))}
    </div>
  );
};

export default RarityFilter;

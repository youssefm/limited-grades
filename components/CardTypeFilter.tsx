import { CardType } from "lib/types";

// const CardTypeIcon = styled.i`
//   cursor: pointer;
//   opacity: 90%;
//   width: 1.28571429em;
//   text-align: center;
// `;

// const HiddenInput = styled.input`
//   display: none;

//   :not(:checked) + i {
//     opacity: 30%;
//   }
// `;

const FILTERS = [
  {
    label: "creatures",
    values: [CardType.CREATURE],
    icon: "ms ms-2x ms-creature",
  },
  {
    label: "instants and sorceries",
    values: [CardType.INSTANT, CardType.SORCERY],
    icon: "ms ms-2x ms-instant",
  },
  {
    label: "artifacts, enchantments, and planeswalkers",
    values: [CardType.ARTIFACT, CardType.ENCHANTMENT, CardType.PLANESWALKER],
    icon: "ms ms-2x ms-enchantment",
  },
  {
    label: "lands",
    values: [CardType.LAND],
    icon: "ms ms-2x ms-land",
  },
];

interface Props {
  values: Set<CardType>;
  setValues: (cardTypes: Set<CardType>) => void;
}

const CardTypeFilter = (props: Props) => {
  const { values, setValues } = props;

  return (
    <div>
      {FILTERS.map((filter, index) => {
        const checked = filter.values.every((cardType) => values.has(cardType));
        return (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                const newValues = new Set(values);
                for (const cardType of filter.values) {
                  if (newValues.has(cardType)) {
                    newValues.delete(cardType);
                  } else {
                    newValues.add(cardType);
                  }
                }
                setValues(newValues);
              }}
            ></input>
            <i
              title={checked ? `Hide ${filter.label}` : `Show ${filter.label}`}
              className={filter.icon}
            />
          </label>
        );
      })}
    </div>
  );
};

export default CardTypeFilter;

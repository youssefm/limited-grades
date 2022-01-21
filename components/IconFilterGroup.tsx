interface Filter<T> {
  label: string;
  values: T[];
  icon: string;
}

interface Props<T> {
  values: Set<T>;
  setValues: (newValues: Set<T>) => void;
  filters: Filter<T>[];
}

const IconFilterGroup = <T extends unknown>({
  values,
  setValues,
  filters,
}: Props<T>) => (
  <div>
    {filters.map(({ label, values: filterValues, icon }) => {
      const checked = filterValues.every((value) => values.has(value));
      return (
        <label key={label}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              const newValues = new Set(values);
              for (const value of filterValues) {
                if (newValues.has(value)) {
                  newValues.delete(value);
                } else {
                  newValues.add(value);
                }
              }
              setValues(newValues);
            }}
            className="peer hidden"
          />
          <i
            title={checked ? `Hide ${label}` : `Show ${label}`}
            className={`${icon} cursor-pointer opacity-30 peer-checked:opacity-90`}
          />
        </label>
      );
    })}
  </div>
);

export default IconFilterGroup;

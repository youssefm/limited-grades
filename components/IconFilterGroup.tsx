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
  <div className="flex">
    {filters.map(({ label, values: filterValues, icon }) => {
      const checked = filterValues.every((value) => values.has(value));
      return (
        <label
          key={label}
          className="w-[46px] h-[38px] flex justify-center items-center bg-zinc-50 border-[1px] ml-negative first:ml-0 border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 hover:z-10 first:rounded-l last:rounded-r cursor-pointer"
        >
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
            className="hidden peer"
          />
          <i
            title={checked ? `Hide ${label}` : `Show ${label}`}
            className={`${icon} opacity-30 peer-checked:opacity-90`}
          />
        </label>
      );
    })}
  </div>
);

export default IconFilterGroup;

import clsx from "clsx";

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
      const toggle = () => {
        const newValues = new Set(values);
        for (const value of filterValues) {
          if (newValues.has(value)) {
            newValues.delete(value);
          } else {
            newValues.add(value);
          }
        }
        setValues(newValues);
      };

      return (
        <div
          key={label}
          className={clsx(
            "overflow-hidden hover:z-20 focus:z-10 ml-[-1px] first:ml-0",
            "w-[46px] h-[36px] last:rounded-r first:rounded-l",
            "border border-zinc-300 hover:border-zinc-500"
          )}
          tabIndex={0}
          role="checkbox"
          aria-checked={checked}
          onKeyDown={(event) => {
            if (event.code === "Space") {
              event.preventDefault();
              toggle();
            }
          }}
        >
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={toggle}
              className="peer hidden"
            />
            <div
              className={clsx(
                "flex justify-center items-center w-full h-full",
                "bg-zinc-200 peer-checked:bg-zinc-50 hover:!bg-zinc-200",
                "opacity-30 peer-checked:opacity-90"
              )}
            >
              <i
                title={checked ? `Hide ${label}` : `Show ${label}`}
                className={`${icon} `}
              />
            </div>
          </label>
        </div>
      );
    })}
  </div>
);

export default IconFilterGroup;

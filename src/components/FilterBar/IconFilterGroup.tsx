import clsx from "clsx";
import { ReactElement } from "react";

import Center from "components/common/Center";
import { TRANSITION_CLASSES } from "lib/styles";

interface Filter<T> {
  label: string;
  values: T[];
  icon: ReactElement;
}

interface Props<T> {
  values: Set<T>;
  setValues: (newValues: Set<T>) => void;
  filters: Filter<T>[];
  className?: string;
}

const IconFilterGroup = <T extends unknown>({
  values,
  setValues,
  filters,
  className,
}: Props<T>) => (
  <div className={clsx("flex", className)}>
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
            "grow min-w-[46px] h-[38px] last:rounded-r first:rounded-l",
            "border border-neutral-300 hover:border-neutral-500 dark:border-black",
            TRANSITION_CLASSES
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
          <label
            className="cursor-pointer"
            title={checked ? `Hide ${label}` : `Show ${label}`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={toggle}
              className="peer hidden"
            />
            <Center
              className={clsx(
                "w-full h-full text-2xl",
                "bg-neutral-200 peer-checked:bg-white hover:!bg-neutral-200",
                "dark:bg-neutral-900 dark:peer-checked:bg-neutral-700 dark:hover:!bg-neutral-900",
                "opacity-30 peer-checked:opacity-100",
                TRANSITION_CLASSES
              )}
            >
              {icon}
            </Center>
          </label>
        </div>
      );
    })}
  </div>
);

export default IconFilterGroup;

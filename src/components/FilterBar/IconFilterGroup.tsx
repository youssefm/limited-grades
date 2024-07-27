import clsx from "clsx";
import { ReactNode } from "react";

import Center from "components/common/Center";
import { TRANSITION_CLASSES } from "lib/styles";

export interface Filter<T> {
  label: string;
  values: T[];
  icon: ReactNode;
  widthClassName?: string;
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
}: Props<T>): JSX.Element => {
  const filtersChecked = filters.map(({ values: filterValues }) =>
    filterValues.every((value) => values.has(value))
  );
  const checkedCount = filtersChecked.filter(Boolean).length;
  const allChecked = checkedCount === filters.length;
  const oneChecked = checkedCount === 1;
  return (
    <div className={clsx("flex", className)}>
      {filters.map(
        ({ label, values: filterValues, icon, widthClassName }, index) => {
          const checked = filtersChecked[index];
          const toggle = (): void => {
            if (allChecked) {
              setValues(new Set(filterValues));
              return;
            }

            if (oneChecked && checked) {
              const allValues = new Set<T>();
              for (const filter of filters) {
                for (const value of filter.values) {
                  allValues.add(value);
                }
              }
              setValues(allValues);
              return;
            }

            const newValues = new Set<T>(values);
            for (const value of filterValues) {
              if (checked) {
                newValues.delete(value);
              } else {
                newValues.add(value);
              }
            }
            setValues(newValues);
          };

          let labelTitle;
          if (allChecked) {
            labelTitle = `Show only ${label}`;
          }
          if (oneChecked && checked) {
            labelTitle = "Show All";
          } else if (checked) {
            labelTitle = `Hide ${label}`;
          } else {
            labelTitle = `Show ${label}`;
          }

          return (
            <div
              key={label}
              className={clsx(
                "-ml-px overflow-hidden first:ml-0 hover:z-20 focus:z-10",
                "h-[38px] grow first:rounded-l last:rounded-r",
                "border border-neutral-300 hover:border-neutral-500 dark:border-black",
                widthClassName
                  ? widthClassName
                  : "min-w-[44px] lg:min-w-[46px]",
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
              <label className="cursor-pointer" title={labelTitle}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={toggle}
                  className="peer hidden"
                />
                <Center
                  className={clsx(
                    "h-full w-full select-none",
                    "bg-neutral-200 hover:!bg-neutral-200 peer-checked:bg-white",
                    "dark:bg-neutral-900 dark:hover:!bg-neutral-900 dark:peer-checked:bg-neutral-700",
                    "opacity-30 transition peer-checked:opacity-100"
                  )}
                >
                  {icon}
                </Center>
              </label>
            </div>
          );
        }
      )}
    </div>
  );
};

export default IconFilterGroup;

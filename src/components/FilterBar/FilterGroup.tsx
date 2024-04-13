import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

const FilterGroup: FC<Props> = ({ label, htmlFor, className, children }) => (
  <div className={clsx("flex items-center lg:block", className)}>
    <label
      htmlFor={htmlFor}
      className="block w-16 select-none text-sm lg:mb-2 lg:w-auto"
    >
      {label}
    </label>
    <div className="grow">{children}</div>
  </div>
);

export default FilterGroup;

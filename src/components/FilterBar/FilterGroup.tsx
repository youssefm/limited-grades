import clsx from "clsx";
import { FC } from "react";

interface Props {
  label: string;
  htmlFor?: string;
  className?: string;
}

const FilterGroup: FC<Props> = ({ label, htmlFor, className, children }) => (
  <div className={clsx("flex items-center lg:block", className)}>
    <label htmlFor={htmlFor} className="block w-16 text-sm select-none lg:mb-2">
      {label}
    </label>
    <div className="grow">{children}</div>
  </div>
);

export default FilterGroup;

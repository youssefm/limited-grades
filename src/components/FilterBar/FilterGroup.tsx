import clsx from "clsx";
import { FC } from "react";

interface Props {
  label: string;
  className?: string;
}

const FilterGroup: FC<Props> = ({ label, className, children }) => (
  <div className={clsx("flex items-center lg:block", className)}>
    <div className="w-16 text-sm select-none lg:mb-2">{label}</div>
    <div className="grow">{children}</div>
  </div>
);

export default FilterGroup;

import { FC } from "react";

const FilterLabel: FC = ({ children }) => (
  <div className="text-sm mb-2 hidden lg:block">{children}</div>
);

export default FilterLabel;

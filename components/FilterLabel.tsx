import { FC } from "react";

const FilterLabel: FC = (props) => (
  <div className="text-sm mb-2 hidden lg:block">{props.children}</div>
);

export default FilterLabel;

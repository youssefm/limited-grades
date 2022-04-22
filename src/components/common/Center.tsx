import clsx from "clsx";
import { FC } from "react";

interface Props {
  className: string;
}

const Center: FC<Props> = ({ className, children }) => (
  <div className={clsx("grid place-items-center", className)}>{children}</div>
);

export default Center;

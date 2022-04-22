import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
  className: string;
  children: ReactNode;
}

const Center: FC<Props> = ({ className, children }) => (
  <div className={clsx("grid place-items-center", className)}>{children}</div>
);

export default Center;

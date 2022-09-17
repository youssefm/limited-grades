import clsx from "clsx";
import { FC } from "react";

import SpinnerIcon from "assets/spinner.svg";

interface Props {
  className?: string;
}

const Spinner: FC<Props> = ({ className }) => (
  <SpinnerIcon
    width="1em"
    height="1em"
    className={clsx(
      "animate-spin fill-blue-500 text-neutral-200 dark:fill-amber-600 dark:text-neutral-600",
      className
    )}
  />
);

export default Spinner;

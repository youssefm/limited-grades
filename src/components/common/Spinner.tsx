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
      "text-neutral-200 dark:text-neutral-600 animate-spin fill-blue-500 dark:fill-amber-600",
      className
    )}
  />
);

export default Spinner;

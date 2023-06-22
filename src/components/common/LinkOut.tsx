import clsx from "clsx";
import { FC, ReactNode } from "react";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  url: string;
  children: ReactNode;
}

const LinkOut: FC<Props> = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    className={clsx("underline", HOVER_CLASSES, TRANSITION_CLASSES)}
  >
    {children}
  </a>
);

export default LinkOut;

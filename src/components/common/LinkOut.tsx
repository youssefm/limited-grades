import clsx from "clsx";
import { FC } from "react";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  url: string;
}

const LinkOut: FC<Props> = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className={clsx("underline", HOVER_CLASSES, TRANSITION_CLASSES)}
  >
    {children}
  </a>
);

export default LinkOut;

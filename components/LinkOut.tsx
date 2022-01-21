import { FC } from "react";

interface Props {
  url: string;
}

const LinkOut: FC<Props> = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="underline hover:text-blue-500"
  >
    {children}
  </a>
);

export default LinkOut;

import { FC } from "react";

interface Props {
  url: string;
}

const LinkOut: FC<Props> = ({ url, children }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="hover:text-blue-500 underline"
  >
    {children}
  </a>
);

export default LinkOut;

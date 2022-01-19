import { FC } from "react";

interface Props {
  url: string;
}

const LinkOut: FC<Props> = (props) => (
  <a
    href={props.url}
    target="_blank"
    rel="noreferrer"
    className="underline hover:text-blue-500"
  >
    {props.children}
  </a>
);

export default LinkOut;

import { ReactElement, ReactNode, SVGProps, useId } from "react";

type Props = SVGProps<SVGSVGElement> & {
  children: ReactNode;
};

const GradientIcon = (props: Props): ReactElement => {
  const { children, ...svgProps } = props;
  const id = useId();

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill={`url(#gradient-${id})`}
      {...svgProps}
    >
      <defs>
        <linearGradient
          id={`gradient-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" className="icon-side-stop" />
          <stop offset="50%" className="icon-middle-stop" />
          <stop offset="100%" className="icon-side-stop" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
};

export default GradientIcon;

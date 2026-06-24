import { ReactElement, SVGProps, useId } from "react";

// Faithful reproduction of the official Magic multicolor (gold) mana symbol:
// a metallic gold gradient disc with a thick ring. Baked into a single SVG so
// the disc and ring share one coordinate system and rasterize together,
// keeping them perfectly concentric across browsers.
const MulticolorIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  const gradientId = useId();
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="74.9814"
          y1="437.0195"
          x2="437.02"
          y2="74.9809"
        >
          <stop offset="0" stopColor="#cca651" />
          <stop offset="0.1134" stopColor="#cda754" />
          <stop offset="0.2044" stopColor="#cfac5e" />
          <stop offset="0.2878" stopColor="#d2b36f" />
          <stop offset="0.3664" stopColor="#d6bd87" />
          <stop offset="0.4412" stopColor="#dccaa5" />
          <stop offset="0.5" stopColor="#e2d7c3" />
          <stop offset="0.5588" stopColor="#dccaa5" />
          <stop offset="0.6336" stopColor="#d6bd87" />
          <stop offset="0.7122" stopColor="#d2b36f" />
          <stop offset="0.7956" stopColor="#cfac5e" />
          <stop offset="0.8866" stopColor="#cda754" />
          <stop offset="1" stopColor="#cca651" />
        </linearGradient>
      </defs>
      <circle fill={`url(#${gradientId})`} cx="256" cy="256" r="256" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M256 60.5C148.028 60.5 60.5 148.028 60.5 256c0 107.973 87.528 195.5 195.5 195.5S451.5 363.973 451.5 256C451.5 148.028 363.972 60.5 256 60.5zm0 335.5c-77.32 0-140-62.68-140-140 0-77.32 62.68-140 140-140 77.319 0 140 62.68 140 140 0 77.32-62.681 140-140 140z"
      />
    </svg>
  );
};

export default MulticolorIcon;

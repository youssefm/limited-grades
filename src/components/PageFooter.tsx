import { Temporal } from "@js-temporal/polyfill";

import LinkOut from "components/common/LinkOut";

interface Props {
  lastUpdatedAt: Temporal.Instant;
}

const PageFooter = ({ lastUpdatedAt }: Props) => (
  <div className="pt-1 pb-2 mt-32 border-t border-neutral-400 content-visibility-auto">
    Developed by <LinkOut url="https://github.com/youssefm">youssefm</LinkOut>{" "}
    using <LinkOut url="https://nextjs.org/">Next.js</LinkOut>, based on designs
    by <LinkOut url="https://github.com/BodyCopy">BodyCopy</LinkOut>
    <br />
    Made possible thanks to{" "}
    <LinkOut url="https://www.17lands.com">17Lands</LinkOut>,{" "}
    <LinkOut url="https://scryfall.com">Scryfall</LinkOut>,{" "}
    <LinkOut url="https://www.flaticon.com/authors/freepik">Freepik</LinkOut>,{" "}
    <LinkOut url="https://keyrune.andrewgioia.com">Keyrune</LinkOut>, and{" "}
    <LinkOut url="https://mana.andrewgioia.com">Mana</LinkOut>
    <br />
    <em>
      Last updated on{" "}
      {lastUpdatedAt.toLocaleString(undefined, {
        dateStyle: "long",
        timeStyle: "short",
      })}
    </em>
  </div>
);

export default PageFooter;

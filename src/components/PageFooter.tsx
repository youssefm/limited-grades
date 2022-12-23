import LinkOut from "components/common/LinkOut";

interface Props {
  lastUpdatedAt: Date;
}

const PageFooter = ({ lastUpdatedAt }: Props): JSX.Element => (
  <div className="mt-32 border-t border-neutral-400 pt-1 pb-2">
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
      {lastUpdatedAt.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "UTC",
      })}{" "}
      UTC
    </em>
  </div>
);

export default PageFooter;

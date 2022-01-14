import styled from "styled-components";

const Container = styled.div`
  margin-top: 300px;
`;

interface Props {
  lastUpdatedAtTicks: number;
}

const PageFooter = ({ lastUpdatedAtTicks }: Props) => (
  <Container className="border-top border-secondary pt-2">
    Developed by{" "}
    <a href="https://github.com/youssefm" target="_blank" rel="noreferrer">
      youssefm
    </a>{" "}
    using Next.js
    <br />
    Made possible thanks to{" "}
    <a href="https://www.17lands.com" target="_blank" rel="noreferrer">
      17Lands
    </a>
    ,{" "}
    <a href="https://scryfall.com" target="_blank" rel="noreferrer">
      Scryfall
    </a>
    ,{" "}
    <a
      href="https://www.flaticon.com/authors/freepik"
      target="_blank"
      rel="noreferrer"
    >
      Freepik
    </a>
    ,{" "}
    <a href="https://keyrune.andrewgioia.com" target="_blank" rel="noreferrer">
      Keyrune
    </a>
    , and{" "}
    <a href="https://mana.andrewgioia.com" target="_blank" rel="noreferrer">
      Mana
    </a>
    <br />
    <em>Last updated at: {new Date(lastUpdatedAtTicks).toLocaleString()}</em>
  </Container>
);

export default PageFooter;

import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import styled from "styled-components";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { getCards } from "../../lib/cards";
import { Column, Deck, Expansion, Tier } from "../../lib/types";
import { capitalize, groupBy, sortBy } from "lodash";
import React from "react";
import CardView from "../../components/CardView";
import { DECK_LABELS, RARITY_SORT_KEY } from "../../lib/constants";
import { useRouter } from "next/dist/client/router";

const TierNameColumn = styled.th`
  width: 4%;
`;

const TierCardsColumn = styled.th`
  text-align: center;
  width: 12%;
`;

export const getStaticPaths = async () => {
  const paths = [];
  for (const expansion of Object.values(Expansion)) {
    for (const deck of Object.values(Deck)) {
      paths.push({
        params: {
          expansion: expansion,
          deck: deck,
        },
      });
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const expansion = context.params!.expansion as Expansion;
  const deck = context.params!.deck as Deck;
  return {
    props: {
      expansion,
      deck,
      cards: await getCards(expansion, deck),
      lastUpdatedAtTicks: new Date().getTime(),
    },
    // Rebuild pages from 17Lands data every four hours
    revalidate: 4 * 60 * 60,
  };
};

const TierList = ({
  expansion,
  deck,
  cards,
  lastUpdatedAtTicks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const sortedCards = sortBy(cards, (card) => RARITY_SORT_KEY[card.rarity]);
  const cardsByGroup = groupBy(
    sortedCards,
    (card) => card.column + "," + card.tier
  );

  return (
    <Container fluid>
      <h1 className="text-center p-4">17Lands Tier List</h1>
      <Row className="justify-content-center">
        <Col md="6">
          <p>
            The table below uses{" "}
            <a href="https://www.17lands.com/card_ratings">17Lands</a> Premier
            Draft data to assign letter grades to cards. It infers a normal
            distribution from the &quot;Games in Hand Win Rate&quot; statistic
            and uses that distribution to assign a grade to each card. For
            example, a card with an GIH winrate statistic that is one standard
            deviation higher than the mean would get a B+. Cards with fewer than
            400 games are not included.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mb-2">
        <Col md="auto">
          <Form.Select
            value={expansion}
            onChange={(event) =>
              router.push(
                `/${(event.target as HTMLInputElement).value}/${deck}`
              )
            }
            size="sm"
          >
            {Object.values(Expansion).map((expansion) => (
              <option key={expansion} value={expansion}>
                {expansion.toUpperCase()}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md="auto">
          <Form.Select
            value={deck}
            onChange={(event) =>
              router.push(
                `/${expansion}/${(event.target as HTMLInputElement).value}`
              )
            }
            size="sm"
          >
            {Object.values(Deck).map((deck) => (
              <option key={deck} value={deck}>
                {DECK_LABELS[deck]}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <TierNameColumn></TierNameColumn>
            {Object.values(Column).map((column) => (
              <TierCardsColumn key={column}>
                {capitalize(column)}
              </TierCardsColumn>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(Tier).map((tier) => (
            <tr key={tier}>
              <TierNameColumn>{tier}</TierNameColumn>
              {Object.values(Column).map((column) => (
                <td key={column}>
                  {cardsByGroup[column + "," + tier]?.map((card) => (
                    <CardView key={card.name} card={card} />
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        <em>
          Last updated at: {new Date(lastUpdatedAtTicks).toLocaleString()}
        </em>
      </p>
    </Container>
  );
};

export default TierList;

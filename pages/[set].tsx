import { groupBy, sortBy } from "lodash";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import styled from "styled-components";

import { getCards } from "../lib/cards";
import {
  Column,
  Deck,
  Rarity,
  MagicSet,
  Grade,
  Card,
  CardType,
} from "../lib/types";
import CardView from "../components/CardView";
import RarityFilter from "../components/RarityFilter";
import SetSelector from "../components/SetSelector";
import DeckSelector from "../components/DeckSelector";
import { COLUMN_ICONS } from "../lib/constants";
import CardDetailModal from "../components/CardDetailModal";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import CardTypeFilter from "../components/CardTypeFilter";

const PageContainer = styled(Container)`
  overflow: auto;
`;

const GradeRowHeader = styled.th`
  width: 3%;
  vertical-align: middle;
  background-color: #f0f1f2 !important;
`;

const CardColumnHeader = styled.th`
  text-align: center;
  width: 14%;
  background-color: #f0f1f2 !important;
`;

export const getStaticPaths = async () => {
  return {
    paths: Object.values(MagicSet).map((set) => ({ params: { set } })),
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const set = context.params!.set as MagicSet;
  return {
    props: {
      set,
      cards: await getCards(set),
      lastUpdatedAtTicks: new Date().getTime(),
    },
    // Rebuild pages from 17Lands data every twelve hours
    revalidate: 12 * 60 * 60,
  };
};

const Page = ({
  set,
  cards,
  lastUpdatedAtTicks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(
    new Set(Object.values(Rarity))
  );
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(Object.values(CardType))
  );
  const [modalCard, setModalCard] = useState<Card>();

  const sortedCards = sortBy(
    cards
      .filter((card) => deck in card.stats)
      .filter((card) => visibleRarities.has(card.rarity))
      .filter((card) =>
        card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
      ),
    (card) => -card.stats[deck]!.score
  );
  const cardsByGroup = groupBy(
    sortedCards,
    (card) => card.column + "," + card.stats[deck]!.grade
  );

  return (
    <PageContainer fluid>
      <PageHeader />
      <Row className="justify-content-center mb-2">
        <Col md="auto">
          <SetSelector
            value={set}
            onChange={(newValue) => {
              router.push(`/${newValue}`);
            }}
          />
        </Col>
        <Col md="auto">
          <DeckSelector value={deck} onChange={setDeck} />
        </Col>
        <Col md="auto">
          <RarityFilter
            set={set}
            values={visibleRarities}
            setValues={setVisibleRarities}
          />
        </Col>
        <Col md="auto">
          <CardTypeFilter
            values={visibleCardTypes}
            setValues={setVisibleCardTypes}
          />
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th></th>
            {Object.values(Column).map((column) => (
              <CardColumnHeader key={column}>
                <i className={COLUMN_ICONS[column]}></i>
              </CardColumnHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(Grade).map((grade) => (
            <tr key={grade}>
              <GradeRowHeader>{grade}</GradeRowHeader>
              {Object.values(Column).map((column) => (
                <td key={column}>
                  {cardsByGroup[column + "," + grade]?.map((card) => (
                    <CardView
                      key={card.cardUrl}
                      card={card}
                      onClick={() => setModalCard(card)}
                    />
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <CardDetailModal
        card={modalCard}
        handleClose={() => setModalCard(undefined)}
      />
      <PageFooter lastUpdatedAtTicks={lastUpdatedAtTicks} />
    </PageContainer>
  );
};

export default Page;

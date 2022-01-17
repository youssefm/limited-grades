import { groupBy, sortBy } from "lodash";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { getCards } from "lib/cards";
import {
  Column,
  Deck,
  Rarity,
  MagicSet,
  Grade,
  Card,
  CardType,
} from "lib/types";
import CardView from "components/CardView";
import RarityFilter from "components/RarityFilter";
import SetSelector from "components/SetSelector";
import DeckSelector from "components/DeckSelector";
import { COLUMN_ICONS, SET_LABELS } from "lib/constants";
import CardDetailModal from "components/CardDetailModal";
import PageFooter from "components/PageFooter";
import PageHeader from "components/PageHeader";
import CardTypeFilter from "components/CardTypeFilter";

// const PageContainer = styled(Container)`
//   overflow: auto;
// `;

// const GradeRowHeader = styled.th`
//   width: 3%;
//   vertical-align: middle;
//   background-color: #f0f1f2 !important;
// `;

// const CardColumnHeader = styled.th`
//   text-align: center;
//   width: 14%;
//   background-color: #f0f1f2 !important;
// `;

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
  const [selectedSet, setSelectedSet] = useState(set);
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(
    new Set(Object.values(Rarity))
  );
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(Object.values(CardType))
  );
  const [modalCard, setModalCard] = useState<Card>();
  const [showSkeletons, setShowSkeletons] = useState(false);

  useEffect(() => {
    if (selectedSet === set) {
      if (loading) {
        setLoading(false);
        setShowSkeletons(false);
      }
    } else {
      if (loading) {
        router.push(`/${selectedSet}`);
      } else {
        setSelectedSet(set);
      }
    }
  }, [selectedSet, set, loading, router]);

  useEffect(() => {
    if (loading) {
      // Add small delay before showing placeholders to prevent screen stuttering
      const timer = setTimeout(() => setShowSkeletons(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowSkeletons(false);
    }
  }, [loading]);

  const sortedCards = sortBy(
    cards
      .filter((card) => deck in card.stats)
      .filter((card) => visibleRarities.has(card.rarity))
      .filter((card) =>
        card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
      ),
    (card) => -card.stats[deck]!.winrate
  );
  const cardsByGroup = groupBy(
    sortedCards,
    (card) => card.column + "," + card.stats[deck]!.grade
  );

  return (
    <div>
      <Head>
        <title>Limited Grades – {SET_LABELS[selectedSet]}</title>
      </Head>
      <PageHeader />
      <SetSelector
        value={selectedSet}
        onChange={(newValue) => {
          setSelectedSet(newValue);
          setLoading(true);
        }}
      />
      <DeckSelector value={deck} onChange={setDeck} />
      <RarityFilter
        set={set}
        values={visibleRarities}
        setValues={setVisibleRarities}
      />
      <CardTypeFilter
        values={visibleCardTypes}
        setValues={setVisibleCardTypes}
      />
      <table>
        <thead>
          <tr>
            <th></th>
            {Object.values(Column).map((column) => (
              <th key={column}>
                <i className={COLUMN_ICONS[column]}></i>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(Grade).map((grade) => (
            <tr key={grade}>
              <th>{grade}</th>
              {Object.values(Column).map((column) => (
                <td key={column}>
                  {/* TODO: Re-enable skeletons */}
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
      </table>
      <CardDetailModal
        card={modalCard}
        handleClose={() => setModalCard(undefined)}
      />
      <PageFooter lastUpdatedAtTicks={lastUpdatedAtTicks} />
    </div>
  );
};

export default Page;

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};

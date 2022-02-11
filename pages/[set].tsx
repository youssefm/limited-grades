import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import CardTable from "components/CardTable";
import {
  CardTypeFilter,
  DeckSelector,
  RarityFilter,
  SetSelector,
} from "components/FilterBar";
import PageFooter from "components/PageFooter";
import PageHeader from "components/PageHeader";
import { getCardStore } from "lib/cards";
import {
  ALL_CARD_TYPES,
  ALL_RARITIES,
  ALL_SETS,
  SET_LABELS,
} from "lib/constants";
import { TRANSITION_CLASSES } from "lib/styles";
import { CardTableDictionary } from "lib/table";
import { Card, Deck, MagicSet } from "lib/types";

interface StaticProps {
  set: MagicSet;
  cards: Card[];
  lastUpdatedAtTicks: number;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ALL_SETS.map((set) => ({ params: { set } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const set = context.params!.set as MagicSet;
  const { cards, updatedAt } = await getCardStore(set);
  return {
    props: {
      set,
      cards,
      lastUpdatedAtTicks: updatedAt.getTime(),
    },
    revalidate: 60 * 60,
  };
};

const Page = ({ set, cards, lastUpdatedAtTicks }: StaticProps) => {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState(set);
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(new Set(ALL_RARITIES));
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(ALL_CARD_TYPES)
  );
  const [showSkeletons, setShowSkeletons] = useState(false);

  useEffect(() => {
    if (selectedSet === set) {
      if (loading) {
        setLoading(false);
        setShowSkeletons(false);
      }
    } else if (loading) {
      router
        .push(`/${selectedSet}`)
        .catch((error) => console.log(`Failed to push new route: ${error}`));
    } else {
      setSelectedSet(set);
    }
  }, [selectedSet, set, loading, router]);

  useEffect(() => {
    if (loading) {
      // Add small delay before showing placeholders to prevent screen stuttering
      const timer = setTimeout(() => setShowSkeletons(true), 300);
      return () => clearTimeout(timer);
    }
    setShowSkeletons(false);
    return undefined;
  }, [loading]);

  const filteredCards = cards
    .filter((card) => visibleRarities.has(card.rarity))
    .filter((card) =>
      card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
    );
  const cardDictionary = new CardTableDictionary(filteredCards, deck);

  return (
    <div
      className={clsx(
        "flex flex-col px-2 min-h-screen",
        "dark:text-neutral-100 dark:bg-neutral-900",
        TRANSITION_CLASSES
      )}
    >
      <Head>
        <title>Limited Grades – {SET_LABELS[selectedSet]}</title>
      </Head>
      <PageHeader />
      <div className="grow">
        <div
          className={clsx(
            "flex flex-col gap-2 p-4",
            "bg-neutral-100 dark:bg-neutral-800 rounded-t-lg",
            "lg:flex-row lg:gap-4 lg:px-8",
            TRANSITION_CLASSES
          )}
        >
          <SetSelector
            value={selectedSet}
            onChange={(newValue) => {
              setSelectedSet(newValue);
              setLoading(true);
            }}
          />
          <DeckSelector value={deck} onChange={setDeck} />
          <div className="hidden gap-4 lg:flex">
            <RarityFilter
              set={set}
              values={visibleRarities}
              setValues={setVisibleRarities}
            />
            <CardTypeFilter
              values={visibleCardTypes}
              setValues={setVisibleCardTypes}
            />
          </div>
        </div>
        <CardTable
          cardDictionary={cardDictionary}
          showSkeletons={showSkeletons}
        />
      </div>
      <PageFooter lastUpdatedAt={new Date(lastUpdatedAtTicks)} />
    </div>
  );
};

export default Page;

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};

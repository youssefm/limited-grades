import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import CardTable from "components/CardTable";
import CardTypeFilter from "components/CardTypeFilter";
import DeckSelector from "components/DeckSelector";
import PageFooter from "components/PageFooter";
import RarityFilter from "components/RarityFilter";
import SetSelector from "components/SetSelector";
import TitleBar from "components/TitleBar";
import { getCards } from "lib/cards";
import {
  ALL_CARD_TYPES,
  ALL_RARITIES,
  ALL_SETS,
  SET_LABELS,
} from "lib/constants";
import { CardTableDictionary } from "lib/table";
import { Deck, MagicSet } from "lib/types";

export const getStaticPaths = async () => ({
  paths: ALL_SETS.map((set) => ({ params: { set } })),
  fallback: false,
});

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
    <div className="px-2">
      <Head>
        <title>Limited Grades – {SET_LABELS[selectedSet]}</title>
      </Head>
      <TitleBar />
      <div className="px-4 py-4 bg-zinc-100 rounded-t-lg flex gap-2 flex-col lg:px-8 lg:flex-row lg:gap-4">
        <SetSelector
          value={selectedSet}
          onChange={(newValue) => {
            setSelectedSet(newValue);
            setLoading(true);
          }}
        />
        <DeckSelector value={deck} onChange={setDeck} />
        <div className="flex gap-4">
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
      <PageFooter lastUpdatedAtTicks={lastUpdatedAtTicks} />
    </div>
  );
};

export default Page;

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};

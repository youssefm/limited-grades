import { Temporal } from "@js-temporal/polyfill";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import PageBody from "components/PageBody";
import PageFooter from "components/PageFooter";
import PageHeader from "components/PageHeader";
import { CardTableContextProvider } from "hooks/useCardTableContext";
import { getCardStore } from "lib/cards";
import { ALL_SETS, SET_LABELS } from "lib/constants";
import { isRecentSet } from "lib/sets";
import { TRANSITION_CLASSES } from "lib/styles";
import { Card, MagicSet } from "lib/types";

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
      lastUpdatedAtTicks: updatedAt.epochMilliseconds,
    },
    revalidate: isRecentSet(set) ? 60 * 60 : 24 * 60 * 60,
  };
};

const Page = ({ set, cards, lastUpdatedAtTicks }: StaticProps) => (
  <>
    <Head>
      <title>Limited Grades – {SET_LABELS[set]}</title>
    </Head>
    <div
      className={clsx(
        "flex overflow-y-auto flex-col px-2 h-full scrollbar-gutter-stable",
        "dark:text-neutral-100 dark:bg-neutral-900",
        TRANSITION_CLASSES
      )}
    >
      <PageHeader />
      <CardTableContextProvider set={set} cards={cards}>
        <PageBody className="grow" />
      </CardTableContextProvider>
      <PageFooter
        lastUpdatedAt={Temporal.Instant.fromEpochMilliseconds(
          lastUpdatedAtTicks
        )}
      />
    </div>
  </>
);

export default Page;

export const config = {
  unstable_includeFiles: ["data/scryfall-oracle-cards.json.gz"],
};

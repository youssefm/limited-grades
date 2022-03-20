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
  lastUpdatedAt: string;
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
      lastUpdatedAt: updatedAt.toString(),
    },
    revalidate: isRecentSet(set) ? 60 * 60 : 24 * 60 * 60,
  };
};

const Page = ({ set, cards, lastUpdatedAt }: StaticProps) => (
  <>
    <Head>
      <title>Limited Grades – {SET_LABELS[set]}</title>
    </Head>
    <div
      className={clsx(
        "flex flex-col px-2 min-h-screen",
        "dark:text-neutral-100 dark:bg-neutral-900",
        TRANSITION_CLASSES
      )}
    >
      <PageHeader />
      <CardTableContextProvider set={set} cards={cards}>
        <PageBody />
      </CardTableContextProvider>
      <PageFooter lastUpdatedAt={Temporal.Instant.from(lastUpdatedAt)} />
    </div>
  </>
);

export default Page;

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};

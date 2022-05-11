import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { memo } from "react";

import PageBody from "components/PageBody";
import PageFooter from "components/PageFooter";
import PageHeader from "components/PageHeader";
import getCardStore from "lib/getCardStore";
import MagicSet from "lib/MagicSet";
import { TRANSITION_CLASSES } from "lib/styles";
import { Card } from "lib/types";

interface StaticProps {
  setCode: string;
  cards: Card[];
  lastUpdatedAtTicks: number;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: MagicSet.ALL.map((set) => ({ params: { setCode: set.code } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const setCode = context.params!.setCode as string;
  const set = MagicSet.lookup(setCode)!;
  const { cards, updatedAt } = await getCardStore(set);
  return {
    props: {
      setCode,
      cards,
      lastUpdatedAtTicks: updatedAt.getTime(),
    },
    revalidate: set.isRecent() ? 60 * 60 : 24 * 60 * 60,
  };
};

const Page = ({ setCode, cards, lastUpdatedAtTicks }: StaticProps) => {
  const set = MagicSet.lookup(setCode)!;
  return (
    <>
      <Head>
        <title>Limited Grades – {set.label}</title>
      </Head>
      <div
        className={clsx(
          "overflow-y-auto px-2 lg:h-full scrollbar-gutter-stable",
          "text-neutral-800 dark:text-neutral-100 dark:bg-neutral-900",
          TRANSITION_CLASSES
        )}
      >
        <div className="flex flex-col mx-auto max-w-[1800px] min-h-full">
          <div className="grow">
            <PageHeader />
            <PageBody set={set} cards={cards} />
          </div>
          <PageFooter lastUpdatedAt={new Date(lastUpdatedAtTicks)} />
        </div>
      </div>
    </>
  );
};

export default memo(Page);

export const config = {
  unstable_includeFiles: ["data/scryfall-oracle-cards.json"],
};

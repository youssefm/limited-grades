import clsx from "clsx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { memo, useMemo } from "react";

import PageBody from "components/PageBody";
import PageFooter from "components/PageFooter";
import PageHeader from "components/PageHeader";
import getCardStore from "lib/getCardStore";
import MagicSet from "lib/MagicSet";
import SetIconDataContext from "lib/SetIconDataContext";
import type { SetIconData } from "lib/setIconLoader";
import { TRANSITION_CLASSES } from "lib/styles";
import { Card } from "lib/types";

interface StaticProps {
  setCode: string;
  cards: Card[];
  lastUpdatedAtTicks: number;
  currentSetIconData: SetIconData;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: MagicSet.ALL.map((set) => ({ params: { setCode: set.code } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const setCode = context.params!.setCode as string;
  const set = MagicSet.lookup(setCode)!;
  const { cards, updatedAt } = await getCardStore(set);
  const { default: setIconPaths } = await import("lib/setIconPaths");
  return {
    props: {
      setCode,
      cards,
      lastUpdatedAtTicks: updatedAt.getTime(),
      currentSetIconData: setIconPaths[setCode]!,
    },
    revalidate: set.isRecent() ? 60 * 60 : 24 * 60 * 60,
  };
};

const Page: NextPage<StaticProps> = ({
  setCode,
  cards,
  lastUpdatedAtTicks,
  currentSetIconData,
}) => {
  const set = MagicSet.lookup(setCode)!;
  const eagerIconData = useMemo(
    () => ({ [setCode]: currentSetIconData }),
    [setCode, currentSetIconData]
  );
  return (
    <SetIconDataContext.Provider value={eagerIconData}>
      <Head>
        <title>{`Limited Grades – ${set.label}`}</title>
      </Head>
      <div
        className={clsx(
          "mx-auto flex min-h-full max-w-[1800px] flex-col px-2",
          "text-neutral-800 dark:text-neutral-100",
          TRANSITION_CLASSES
        )}
      >
        <PageHeader />
        <PageBody set={set} cards={cards} className="grow" />
        <PageFooter lastUpdatedAt={new Date(lastUpdatedAtTicks)} />
      </div>
    </SetIconDataContext.Provider>
  );
};

export default memo(Page);

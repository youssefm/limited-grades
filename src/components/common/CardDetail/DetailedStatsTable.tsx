import Tippy from "@tippyjs/react";
import React, { FC, ReactNode } from "react";

import Deck from "lib/Deck";
import { Card } from "lib/types";
import {
  formatNumber,
  formatPercentage,
  formatPercentageDifference,
} from "lib/util";

const StatsRow: FC<{
  label: string;
  tooltipText: string;
  className?: string;
  children: ReactNode;
}> = ({ label, tooltipText, className, children }) => (
  <tr className={className}>
    <td className="py-2 pl-4 pr-12">
      <Tippy
        content={<div className="max-w-sm p-2">{tooltipText}</div>}
        placement="bottom-start"
        animation={false}
      >
        <span className="cursor-pointer">{label}</span>
      </Tippy>
    </td>
    <td className="pr-4 text-right font-mono text-sm">{children}</td>
  </tr>
);

interface Props {
  card: Card;
}

const DetailedStatsTable: FC<Props> = ({ card }) => (
  <table className="w-full border border-neutral-200 dark:border-black lg:w-[21em]">
    <tbody>
      {card.overallStats.lastSeenAt !== null && (
        <StatsRow
          label="Average last seen at"
          tooltipText="The average pick number where this card was last seen in packs"
        >
          {formatNumber(card.overallStats.lastSeenAt, 2)}
        </StatsRow>
      )}
      {card.overallStats.takenAt !== null && (
        <StatsRow
          label="Average taken at"
          tooltipText="The average pick number at which this card was taken by 17Lands drafters"
        >
          {formatNumber(card.overallStats.takenAt, 2)}
        </StatsRow>
      )}
      <StatsRow
        label="Number of games played"
        tooltipText="The number of games played with this card in the maindeck"
        className="border-t border-neutral-200 dark:border-black"
      >
        {formatNumber(card.overallStats.gameCount)}
      </StatsRow>
      <StatsRow
        label="Number of games in hand"
        tooltipText="The number of times this card was drawn, either in the opening hand or later"
      >
        {formatNumber(card.stats[Deck.ALL.code]!.gameCount)}
      </StatsRow>
      {card.overallStats.playedWinrate !== null && (
        <StatsRow
          label="Games played win rate"
          tooltipText="The win rate of decks with this card in the maindeck"
          className="border-t border-neutral-200 dark:border-black"
        >
          {formatPercentage(card.overallStats.playedWinrate)}
        </StatsRow>
      )}
      {card.overallStats.openingHandWinrate !== null && (
        <StatsRow
          label="Opening hand win rate"
          tooltipText="The win rate of games where this card was in the opening hand"
        >
          {formatPercentage(card.overallStats.openingHandWinrate)}
        </StatsRow>
      )}
      {card.overallStats.drawnWinrate !== null && (
        <StatsRow
          label="Games drawn win rate"
          tooltipText="The win rate of games where this card was drawn, not counting cards from the opening hand"
        >
          {formatPercentage(card.overallStats.drawnWinrate)}
        </StatsRow>
      )}
      <StatsRow
        label="Games in hand win rate"
        tooltipText="The win rate of games where this card was drawn, either in the opening hand or later"
      >
        {formatPercentage(card.stats[Deck.ALL.code]!.winrate)}
      </StatsRow>
      {card.overallStats.notDrawnWinrate !== null && (
        <>
          <StatsRow
            label="Games not drawn win rate"
            tooltipText="The win rate of games where this card was in the maindeck, but was never drawn"
          >
            {formatPercentage(card.overallStats.notDrawnWinrate)}
          </StatsRow>
          <StatsRow
            label="Improvement when drawn"
            tooltipText="The difference between Games in hand win rate and Games not drawn win rate"
          >
            {formatPercentageDifference(
              card.stats[Deck.ALL.code]!.winrate -
                card.overallStats.notDrawnWinrate
            )}
          </StatsRow>
        </>
      )}
    </tbody>
  </table>
);

export default DetailedStatsTable;

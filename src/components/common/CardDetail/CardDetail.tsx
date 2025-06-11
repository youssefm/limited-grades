import { FC } from "react";

import { Card } from "lib/types";

import CardImage from "./CardImage";
import DeckAnalysisTable from "./DeckAnalysisTable";
import DetailedStatsTable from "./DetailedStatsTable";
import LoadingCardImage from "./LoadingCardImage";

interface Props {
  card: Card;
  showLoadingState?: boolean;
}

const CardDetail: FC<Props> = ({ card, showLoadingState = false }) => (
  <div className="flex flex-col gap-6 lg:flex-row">
    <div className="self-center lg:mt-9 lg:self-start">
      {showLoadingState ? (
        <LoadingCardImage card={card} />
      ) : (
        <CardImage card={card} />
      )}
    </div>
    <div className="self-stretch">
      <div className="mb-2 text-lg">Deck Analysis</div>
      <DeckAnalysisTable card={card} showStats />
    </div>
    <div className="self-stretch">
      <div className="mb-2 text-lg">Full 17Lands Stats</div>
      <DetailedStatsTable card={card} />
    </div>
  </div>
);

export default CardDetail;

import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";

import Banner from "components/common/Banner";
import Center from "components/common/Center";
import Spinner from "components/common/Spinner";
import { isSetUnderEmbargo } from "lib/sets";
import { Card, MagicSet } from "lib/types";

import CardImage from "./CardImage";
import DeckAnalysisTable from "./DeckAnalysisTable";
import DetailedStatsTable from "./DetailedStatsTable";

interface Props {
  card: Card;
  set: MagicSet;
  isVisible?: boolean;
}

const CardDetail: FC<Props> = ({ card, set, isVisible = true }) => {
  const [displayedCard, setDisplayedCard] = useState<Card>(card);
  const [isElementVisible, setIsElementVisible] = useState(isVisible);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (card !== displayedCard) {
      setIsImageLoading(true);
      setDisplayedCard(card);
    }
    if (isVisible !== isElementVisible) {
      setIsElementVisible(isVisible);
    }
  }, [card, displayedCard, isVisible, isElementVisible]);

  useEffect(() => {
    if (isImageLoading) {
      const timer = setTimeout(() => setIsImageLoading(false), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isImageLoading]);

  const underEmbargo = isSetUnderEmbargo(set);
  return (
    <div className={clsx({ invisible: !isElementVisible })}>
      {underEmbargo && (
        <Banner dismissable={false}>
          <ImInfo className="inline relative bottom-0.5 mr-2" />
          Detailed 17Lands stats are not yet available for this set
        </Banner>
      )}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="self-center mt-9 lg:self-start">
          {isImageLoading && (
            <Center className="w-[240px] h-[340px]">
              <Spinner className="text-5xl" />
            </Center>
          )}
          <CardImage
            card={displayedCard}
            className={clsx({ hidden: isImageLoading })}
          />
        </div>
        <div className="self-stretch">
          <div className="mb-2 text-lg">Deck Analysis</div>
          <DeckAnalysisTable card={displayedCard} showStats={!underEmbargo} />
        </div>
        {!underEmbargo && (
          <div className="self-stretch">
            <div className="mb-2 text-lg">Full 17Lands Stats</div>
            <DetailedStatsTable card={displayedCard} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetail;

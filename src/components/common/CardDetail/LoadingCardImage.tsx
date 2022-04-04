import clsx from "clsx";
import { FC, useEffect, useState } from "react";

import useIsLoading from "hooks/useIsLoading";
import { Card } from "lib/types";

import Center from "../Center";
import Spinner from "../Spinner";
import CardImage from "./CardImage";

interface Props {
  card: Card;
}

const LoadingCardImage: FC<Props> = ({ card }) => {
  const [loadedCard, setLoadedCard] = useState<Card>();
  const [isLoading, markAsLoading, markAsLoaded] = useIsLoading(200, true);

  useEffect(() => {
    if (card !== loadedCard) {
      markAsLoading();
    }
  }, [card, loadedCard, markAsLoading]);

  const onLoad = () => {
    setLoadedCard(card);
    markAsLoaded();
  };

  return (
    <>
      {isLoading && (
        <Center className="w-[240px] h-[340px]">
          <Spinner className="text-5xl" />
        </Center>
      )}

      <CardImage
        card={card}
        className={clsx({ hidden: isLoading })}
        onLoad={onLoad}
      />
    </>
  );
};

export default LoadingCardImage;

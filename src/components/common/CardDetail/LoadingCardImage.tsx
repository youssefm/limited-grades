import clsx from "clsx";
import { FC, useState } from "react";

import useDelayedLoading from "hooks/useDelayedLoading";
import { Card } from "lib/types";

import Center from "../Center";
import Spinner from "../Spinner";
import CardImage from "./CardImage";

interface Props {
  card: Card;
}

const LoadingCardImage: FC<Props> = ({ card }) => {
  const [loadedCard, setLoadedCard] = useState<Card>();
  const isLoading = useDelayedLoading(card === loadedCard, 200);

  const showSpinner = isLoading();
  return (
    <>
      {showSpinner && (
        <Center className="w-[240px] h-[340px]">
          <Spinner className="text-5xl" />
        </Center>
      )}

      <CardImage
        card={card}
        className={clsx({ hidden: showSpinner })}
        onLoad={() => {
          setLoadedCard(card);
        }}
      />
    </>
  );
};

export default LoadingCardImage;

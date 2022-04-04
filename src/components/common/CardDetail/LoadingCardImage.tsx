import clsx from "clsx";
import { FC, useState } from "react";

import { Card } from "lib/types";

import Center from "../Center";
import Spinner from "../Spinner";
import CardImage from "./CardImage";

interface Props {
  card: Card;
}

const LoadingCardImage: FC<Props> = ({ card }) => {
  const [loadedCard, setLoadedCard] = useState<Card>();

  const isLoading = card !== loadedCard;
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
        onLoad={() => {
          setLoadedCard(card);
        }}
      />
    </>
  );
};

export default LoadingCardImage;

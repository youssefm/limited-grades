import Tippy from "@tippyjs/react";
import { FC, useCallback, useMemo, useRef, useState } from "react";

import BackCardImage from "components/common/BackCardImage";
import FrontCardImage from "components/common/FrontCardImage";
import { Card } from "lib/types";

import CardBubble from "./CardBubble";

const CardBubbleWithPreview: FC<{ card: Card; onClick: () => void }> = ({
  card,
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHoverMounted, setIsHoverMounted] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const mouseHovered = useRef(false);
  const imagesLoadedCount = useRef(0);

  const showPreviewIfReady = useCallback(() => {
    if (mouseHovered.current) {
      const imageCount = card.cardBackUrl ? 2 : 1;
      if (imagesLoadedCount.current === imageCount) {
        setIsPreviewVisible(true);
      }
    }
  }, [card.cardBackUrl]);

  const cardBubble = useMemo(
    () => (
      <CardBubble
        card={card}
        onClick={onClick}
        onMouseEnter={() => {
          setIsHoverMounted(true);
          mouseHovered.current = true;
          showPreviewIfReady();
        }}
        onMouseLeave={() => {
          setIsPreviewVisible(false);
          mouseHovered.current = false;
        }}
        ref={ref}
      />
    ),
    [card, onClick, showPreviewIfReady]
  );

  let tippyElement = null;

  if (isHoverMounted) {
    const onLoad = () => {
      imagesLoadedCount.current += 1;
      showPreviewIfReady();
    };

    let tooltip = <FrontCardImage card={card} onLoad={onLoad} />;
    if (card.cardBackUrl) {
      tooltip = (
        <div className="flex">
          {tooltip}
          <BackCardImage card={card} onLoad={onLoad} />
        </div>
      );
    }

    tippyElement = (
      <Tippy
        reference={ref}
        content={tooltip}
        placement="bottom-start"
        visible={isPreviewVisible}
        animation={false}
      />
    );
  }

  return (
    <>
      {cardBubble}
      {tippyElement}
    </>
  );
};

interface Props {
  card: Card;
  onClick: () => void;
  enableHover: boolean;
}

const CardView: FC<Props> = ({ card, onClick, enableHover }) => {
  if (enableHover) {
    return <CardBubbleWithPreview card={card} onClick={onClick} />;
  }
  return <CardBubble card={card} onClick={onClick} />;
};

export default CardView;

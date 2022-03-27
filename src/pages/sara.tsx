/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import { upperFirst } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { getAllCardsByType } from "lib/scryfall";
import { CardType } from "lib/types";

interface StaticProps {
  imageUrls: string[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const landCards = await getAllCardsByType(CardType.LAND);
  const imageUrls = [];
  for (const card of landCards) {
    if (card.image_uris) {
      imageUrls.push(card.image_uris.border_crop);
    } else if (card.card_faces) {
      for (const cardFace of card.card_faces) {
        if (cardFace.type_line.includes(upperFirst(CardType.LAND))) {
          imageUrls.push(cardFace.image_uris.border_crop);
        }
      }
    }
  }

  return {
    props: {
      imageUrls,
    },
  };
};

const Page = ({ imageUrls }: StaticProps) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>();
  const [activeImageUrls, setActiveImageUrls] = useState<string[]>([]);

  const getRandomImage = useCallback(
    () => imageUrls[Math.floor(Math.random() * imageUrls.length)],
    [imageUrls]
  );

  const moveToNextImage = useCallback(() => {
    let nextImage = getRandomImage();
    while (activeImageUrls.includes(nextImage)) {
      nextImage = getRandomImage();
    }
    const nextActiveUrls = [...activeImageUrls, nextImage];
    if (currentImageUrl) {
      const currentIndex = activeImageUrls.indexOf(currentImageUrl);
      if (currentIndex >= 0) {
        setCurrentImageUrl(activeImageUrls[currentIndex + 1]);
      }
      if (currentIndex >= 1) {
        nextActiveUrls.shift();
      }
    }
    setActiveImageUrls(nextActiveUrls);
  }, [getRandomImage, activeImageUrls, currentImageUrl]);

  useEffect(() => {
    const currentImage = getRandomImage();
    let nextImage = getRandomImage();
    while (nextImage === currentImage) {
      nextImage = getRandomImage();
    }
    setActiveImageUrls([currentImage, getRandomImage()]);
    setCurrentImageUrl(currentImage);
  }, [getRandomImage]);

  useEffect(() => {
    const handleRightArrowPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        moveToNextImage();
      }
    };
    document.addEventListener("keydown", handleRightArrowPress);
    return () => document.removeEventListener("keydown", handleRightArrowPress);
  }, [moveToNextImage]);

  return (
    <>
      <Head>
        <title>Limited Grades</title>
      </Head>
      <div className="flex overflow-y-auto justify-center items-center h-full bg-neutral-900">
        <div>
          <h1 className="mb-4 text-4xl text-center text-neutral-100">
            For Sara 🙂
          </h1>
          <div className="relative w-[720px] h-[1020px]">
            <button onClick={moveToNextImage} type="button">
              {activeImageUrls.map((imageUrl) => (
                <div
                  key={imageUrl}
                  className={clsx(
                    "absolute inset-0 transition-all duration-500 ease-in-out backface-invisible",
                    {
                      "rotate-y-0": imageUrl === currentImageUrl,
                      "rotate-y-180": imageUrl !== currentImageUrl,
                    }
                  )}
                >
                  <img src={imageUrl} width="720" height="1020" />
                </div>
              ))}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

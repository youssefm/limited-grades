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

  const getRandomImageUrl = useCallback(
    () => imageUrls[Math.floor(Math.random() * imageUrls.length)],
    [imageUrls]
  );

  const moveToNextImage = useCallback(() => {
    let nextImage = getRandomImageUrl();
    while (activeImageUrls.includes(nextImage)) {
      nextImage = getRandomImageUrl();
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
  }, [getRandomImageUrl, activeImageUrls, currentImageUrl]);

  useEffect(() => {
    const initialActiveImageUrls: string[] = [];
    for (let i = 0; i < 4; i += 1) {
      let imageUrl = getRandomImageUrl();
      while (initialActiveImageUrls.includes(imageUrl)) {
        imageUrl = getRandomImageUrl();
      }
      initialActiveImageUrls.push(imageUrl);
    }

    setActiveImageUrls(initialActiveImageUrls);
    setCurrentImageUrl(initialActiveImageUrls[0]);
  }, [getRandomImageUrl]);

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
        <div className="max-h-full">
          <h1 className="mb-4 text-4xl text-center text-neutral-100">
            For Sara 🙂
          </h1>
          <div className="relative">
            <button onClick={moveToNextImage} type="button">
              {activeImageUrls.map((imageUrl) => (
                <div
                  key={imageUrl}
                  className={clsx(
                    "transition-transform duration-500 ease-in-out backface-invisible",
                    {
                      "absolute inset-0": imageUrl !== currentImageUrl,
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

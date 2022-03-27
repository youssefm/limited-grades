/* eslint-disable jsx-a11y/alt-text */
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

  const setNextImage = useCallback(
    () =>
      setCurrentImageUrl(
        imageUrls[Math.floor(Math.random() * imageUrls.length)]
      ),
    [imageUrls, setCurrentImageUrl]
  );

  useEffect(() => setNextImage(), [setNextImage]);

  useEffect(
    () =>
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          setNextImage();
        }
      }),
    [setNextImage]
  );

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
          {currentImageUrl && (
            <button type="button" onClick={setNextImage}>
              <img src={currentImageUrl} width="720" height="1020" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

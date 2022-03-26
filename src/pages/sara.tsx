/* eslint-disable jsx-a11y/alt-text */
import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { getAllCardsByType } from "lib/scryfall";
import { CardType } from "lib/types";

interface StaticProps {
  imageUrls: string[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => ({
  props: {
    imageUrls: (await getAllCardsByType(CardType.LAND))
      .map((card) => card.image_uris?.border_crop)
      .filter((url) => url),
  },
});

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

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};

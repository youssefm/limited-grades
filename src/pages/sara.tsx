/* eslint-disable jsx-a11y/alt-text */
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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
        if (cardFace.type_line.toLowerCase().includes(CardType.LAND)) {
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

const Page: NextPage<StaticProps> = ({ imageUrls }) => {
  const swiperRef = useRef<SwiperCore>();
  const [activeImageUrls, setActiveImageUrls] = useState<string[]>([]);

  const getRandomImageUrl = useCallback(
    () => imageUrls[Math.floor(Math.random() * imageUrls.length)]!,
    [imageUrls]
  );

  useEffect(() => {
    const initialActiveImageUrls: string[] = [];
    for (let i = 0; i < 7; i += 1) {
      let imageUrl = getRandomImageUrl();
      while (initialActiveImageUrls.includes(imageUrl)) {
        imageUrl = getRandomImageUrl();
      }
      initialActiveImageUrls.push(imageUrl);
    }

    setActiveImageUrls(initialActiveImageUrls);
  }, [getRandomImageUrl]);

  const onSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      if (swiper.activeIndex <= 2) {
        let nextImage = getRandomImageUrl();
        while (activeImageUrls.includes(nextImage)) {
          nextImage = getRandomImageUrl();
        }
        setActiveImageUrls([nextImage, ...activeImageUrls]);
        swiper.slideTo(swiper.activeIndex + 1, 0);
      }
      if (swiper.activeIndex >= activeImageUrls.length - 3) {
        let nextImage = getRandomImageUrl();
        while (activeImageUrls.includes(nextImage)) {
          nextImage = getRandomImageUrl();
        }
        setActiveImageUrls([...activeImageUrls, nextImage]);
      }
    }
  };

  useEffect(() => {
    const handleRightArrowPress = (e: KeyboardEvent) => {
      if (swiperRef.current) {
        if (e.key === "ArrowRight") {
          swiperRef.current.slideNext();
        } else if (e.key === "ArrowLeft") {
          swiperRef.current.slidePrev();
        }
      }
    };
    document.addEventListener("keydown", handleRightArrowPress);
    return () => document.removeEventListener("keydown", handleRightArrowPress);
  }, []);

  return (
    <>
      <Head>
        <title>For Sara ❤️</title>
      </Head>
      <div className="h-full bg-neutral-900">
        <h1 className="p-4 text-4xl text-center text-neutral-100">
          For Sara ❤️
        </h1>
        <Swiper
          initialSlide={3}
          onSlideChangeTransitionEnd={onSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {activeImageUrls.map((imageUrl) => (
            <SwiperSlide key={imageUrl}>
              <img
                src={imageUrl}
                width="480"
                height="680"
                className="mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Page;

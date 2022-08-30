/* eslint-disable jsx-a11y/alt-text */
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { LAND_IMAGES } from "lib/scryfall";

interface StaticProps {
  imageUrls: string[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => ({
  props: {
    imageUrls: await LAND_IMAGES.get(),
  },
});

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

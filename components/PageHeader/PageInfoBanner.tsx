import clsx from "clsx";
import React, { FC } from "react";
import { ImInfo } from "react-icons/im";

import Banner from "components/common/Banner";
import LinkOut from "components/common/LinkOut";
import {
  LOCAL_STORAGE_HIDE_BANNER_KEY,
  LOCAL_STORAGE_HIDE_BANNER_VALUE,
} from "lib/constants";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  onLearnMore: () => void;
}

const PageInfoBanner: FC<Props> = ({ onLearnMore }) => {
  const onClose = () => {
    localStorage.setItem(
      LOCAL_STORAGE_HIDE_BANNER_KEY,
      LOCAL_STORAGE_HIDE_BANNER_VALUE
    );
  };
  return (
    <Banner id="page-info-banner" onClose={onClose}>
      <ImInfo className="inline relative bottom-0.5 mr-2" />
      Grades below are based on{" "}
      <LinkOut url="https://www.17lands.com/">17Lands</LinkOut> win rate data.{" "}
      <button
        onClick={onLearnMore}
        className={clsx("underline", HOVER_CLASSES, TRANSITION_CLASSES)}
        type="button"
      >
        Learn more
      </button>
    </Banner>
  );
};

export default PageInfoBanner;
